import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll() {
    const menus = await this.menuRepository.find();
    if (!menus)
      throw new RpcException({
        message: 'No existen datos',
        status: HttpStatus.NOT_FOUND,
      });

    return await this.menuRepository.find();
  }
}
