import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { MESA_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('mesas')
export class MesasController {
  constructor(
    @Inject(MESA_SERVICE) private readonly mesasClient: ClientProxy,
  ) {}

  @Get('disponible/:num')
  findAvailable(@Param('num') num: number) {
    return this.mesasClient.send('findAvailableMesa', {num}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id/:state')
  updateState(
    @Param('id') id: number,
    @Param('state') state: boolean,
  ) {
    return this.mesasClient.send('updateStateMesa', { id, state }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
