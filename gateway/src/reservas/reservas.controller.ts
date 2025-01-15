import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { RESERVAS_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('reservas')
export class ReservasController {
  constructor(
    @Inject(RESERVAS_SERVICE) private readonly reservasClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasClient.send('createReserva', createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservasClient.send('findAllReservas', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservasClient.send('findOneReserva', id);
  }

}
