import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateReservaDto, UpdateReservaDto } from './dto';
import { RESERVAS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('reservas')
export class ReservasController {
  constructor(
    @Inject(RESERVAS_SERVICE) private readonly reservasClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasClient.send('createReserva', createReservaDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll() {
    return this.reservasClient.send('findAllReservas', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservasClient.send('findOneReserva', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Get('user/:id')
  findOneByUser(@Param('id') id: string) {
    return this.reservasClient.send('findByUserReserva', { idUser: id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservasClient
      .send('updateReserva', { id, ...updateReservaDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservasClient.send('removeReserva', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
