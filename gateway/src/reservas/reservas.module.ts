import { Module } from '@nestjs/common';
import { ReservasController } from './reservas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RESERVAS_SERVICE } from '../config';

@Module({
  controllers: [ReservasController],
  providers: [],
  imports: [

    ClientsModule.register([
      {
        name: RESERVAS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.reservasMsHost,
          port: envs.reservasMsPort,
        }},
    ])
  ]
})
export class ReservasModule {}
