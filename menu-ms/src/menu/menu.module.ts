import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import {Menu} from "./entities/menu.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [TypeOrmModule.forFeature([Menu])]
})
export class MenuModule {}
