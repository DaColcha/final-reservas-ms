import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { MESA_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, tap } from 'rxjs';

@Controller('mesas')
export class MesasController {
  constructor(
    @Inject(MESA_SERVICE) private readonly mesasClient: ClientProxy,
  ) {}

  @Get('disponible/:num')
  findAvailable(@Param('num', ParseIntPipe) num: number) {
    return this.mesasClient.send('findAvailableMesa', num).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id/:state')
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Param('state', ParseBoolPipe) state: boolean,
  ) {
    console.log(`Gateway enviando actualización de mesa: id=${id}, state=${state}`);
    return this.mesasClient.send('updateStateMesa', { id, state }).pipe(
      tap((data) => console.log(`Gateway recibió respuesta del microservicio:`, data)),
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
