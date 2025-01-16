import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [TypeOrmModule.forFeature([Reserva])],
})
export class ReservasModule {}
