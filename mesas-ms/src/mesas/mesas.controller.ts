import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MesasService } from './mesas.service';

@Controller()
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @MessagePattern('findAvailableMesa')
  findAvailable(@Payload() num: number) {
    return this.mesasService.findAvailable(num);
  }

  @MessagePattern('updateStateMesa')
  updateState(@Payload() id: number, state : boolean) {
    return this.mesasService.updateState(id, state);
  }

}
