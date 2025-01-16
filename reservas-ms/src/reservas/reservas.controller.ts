import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto';
import { UpdateReservaDto } from './dto';

@Controller()
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @MessagePattern('createReserva')
  create(@Payload() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @MessagePattern('findAllReservas')
  findAll() {
    return this.reservasService.findAll();
  }

  @MessagePattern('findOneReserva')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.reservasService.findOne(id);
  }

  @MessagePattern('findByUserReserva')
  findByUser(@Payload('idUser', ParseUUIDPipe) idUser: string) {
    return this.reservasService.findByUser(idUser);
  }

  @MessagePattern('updateReserva')
  update(@Payload() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(updateReservaDto);
  }

  @MessagePattern('removeReserva')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.reservasService.remove(id);
  }
}
