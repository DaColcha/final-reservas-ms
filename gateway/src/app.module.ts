import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RESERVAS_SERVICE } from './config';
import { MesasModule } from './mesas/mesas.module';

@Module({
  imports: [
    ReservasModule,
    MesasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
