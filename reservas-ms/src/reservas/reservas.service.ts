import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservaDto } from './dto';
import { UpdateReservaDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { isUUID } from 'class-validator';
import { AUTH_SERVICE } from '../config';
import { catchError } from 'rxjs';

@Injectable()
export class ReservasService {
  private readonly logger = new Logger(ReservasService.name);

  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    //TODO: Consultar disponibilidad de MESA
    // const mesa = await this.mesasService.findAvaiblable(
    //   createReservaDto.cantidadPersonas,
    // );

    const mesa = 1;
    const usuario = this.authClient
      .send('checkUserExistence', { userId: createReservaDto.usuarioId })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );

    if (!usuario)
      throw new RpcException({
        message: 'Usuario no encontrado',
        status: HttpStatus.NOT_FOUND,
      });

    const { usuarioId, ...rest } = createReservaDto;

    try {
      if (mesa) {
        const reserva = this.reservaRepository.create({
          ...rest,
          estado: 'solicitada',
          mesa: mesa,
          usuario: usuarioId,
        });

        await this.reservaRepository.save(reserva);

        //TODO: Actualizar estado de la mesa
        // await this.mesasService.updateState(mesa.id, false); // Ocupar mesa

        return {
          ...reserva,
          mesa: { id: mesa },
        };
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const reservas = await this.reservaRepository.find();
    if (!reservas)
      throw new RpcException({
        message: 'No existen reservas',
        status: HttpStatus.NOT_FOUND,
      });

    return await this.reservaRepository.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new RpcException({
        message: 'Id de reserva invalido',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const reserva = await this.reservaRepository.findOne({
      where: { id: id },
    });

    if (!reserva)
      throw new RpcException({
        message: 'Reserva no encontrada',
        status: HttpStatus.NOT_FOUND,
      });

    return reserva;
  }

  async findByUser(id: string) {
    if (!isUUID(id)) {
      throw new RpcException({
        message: 'Id de usuario invalido',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const reservas = await this.reservaRepository.find({
      where: {
        usuario: id,
      },
    });

    if (!reservas)
      throw new RpcException({
        message: 'No existen reservas para este usuario',
        status: HttpStatus.NOT_FOUND,
      });

    return reservas;
  }

  async update(updateReservaDto: UpdateReservaDto) {
    const { id, ...updateDto } = updateReservaDto;

    const reserva = await this.findOne(id);

    let newData;

    if (!reserva)
      throw new RpcException({
        message: 'Reserva no encontrada',
        status: HttpStatus.NOT_FOUND,
      });

    if (updateDto.usuarioId) {
      const { usuarioId, ...rest } = updateDto;

      const usuario = this.authClient
        .send('checkUserExistence', { userId: usuarioId })
        .pipe(
          catchError((err) => {
            throw new RpcException(err);
          }),
        );

      if (!usuario)
        throw new RpcException({
          message: 'Usuario no encontrado',
          status: HttpStatus.NOT_FOUND,
        });

      newData = { ...rest, usuario: usuarioId };
    } else {
      newData = updateDto;
    }

    try {
      this.reservaRepository.merge(reserva, newData);

      await this.reservaRepository.save(reserva);
      if (
        updateDto.estado === 'cancelada' ||
        updateDto.estado === 'finalizada'
      ) {
        //TODO: Consultar liberar mesa
        // await this.mesasService.updateState(reserva.mesa.id, true);

        this.logger.log('Mesa liberada');
      }

      return reserva;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const reserva = await this.findOne(id);

    if (reserva) await this.reservaRepository.delete(reserva.id);

    //TODO: Consultar liberar mesa

    return { message: 'Reserva eliminada', status: HttpStatus.OK };
  }

  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new RpcException({
        message: error.detail,
        status: HttpStatus.BAD_REQUEST,
      });

    this.logger.error(error.message);
    throw new RpcException({
      message: 'Error en el servidor',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
