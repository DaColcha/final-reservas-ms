import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mesa} from "./entities/mesa.entity";

@Module({
  controllers: [MesasController],
  providers: [MesasService],
  imports: [
    TypeOrmModule.forFeature([Mesa])
  ],
  exports: [ MesasService , TypeOrmModule]
})
export class MesasModule {}
