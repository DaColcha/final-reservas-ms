import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs, MESA_SERVICE } from '../config';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.authMsHost,
          port: envs.authMsPort,
        },
      },
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
export class ReservasModule {}
