import { Module } from '@nestjs/common';
import { MesasController } from './mesas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, MESA_SERVICE } from 'src/config';

@Module({
  controllers: [MesasController],
  providers: [],
  imports: [
      ClientsModule.register([
        {
          name: MESA_SERVICE,
          transport: Transport.TCP,
          options: {
            host: envs.mesaMsHost,
            port: envs.mesaMsPort,
          },
        },
      ]),
    ],
})
export class MesasModule {}
