import { Controller, Get, Inject} from '@nestjs/common';
import { MENU_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('menu')
export class MenuController {
  constructor(
      @Inject(MENU_SERVICE) private readonly menuClient: ClientProxy,
    ) {}

  @Get()
  findAll() {
    return this.menuClient.send('findAllMenu', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

}
