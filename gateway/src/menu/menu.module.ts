import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, MENU_SERVICE} from '../config';

@Module({
  controllers: [MenuController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: MENU_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.menuMsHost,
          port: envs.menuMsPort,
        },
      },
    ]),
  ],
})
export class MenuModule {}
