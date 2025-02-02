import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  private readonly logger = new Logger(MenuController.name);

  constructor(private readonly menuService: MenuService) {}

  @MessagePattern('findAllMenu')
  findAll() {
    return this.menuService.findAll();
  }
}