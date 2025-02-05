import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MesasService {

  constructor(

      @InjectRepository(Mesa)
      private readonly mesaRepository: Repository<Mesa>,
  ) {
  }

  async findAvailable(num: number) {
      const mesas = await this.mesaRepository.find({
          where: {
              disponible: true
          }
      });

      console.log(`Resultado de la búsqueda: `, mesas);
      console.log(`Num enviado: `, num);


      if(!mesas) throw new RpcException({
        message: 'No hay mesas disponibles',
        status: HttpStatus.NOT_FOUND,
      });

      const mesaAdecuada = mesas.find(mesa =>
          mesa.numeroPersonas >= num && mesa.numeroPersonas <= (num + 2));

    console.log(`Mesa adecuada: `, mesaAdecuada);

      if (!mesaAdecuada) throw new RpcException({
        message: 'No hay mesas disponibles para la cantidad de personas solicitadas',
        status: HttpStatus.NOT_FOUND,
      });

      return mesaAdecuada
  }

  async updateState(id: number, state : boolean){
      const mesa = await this.mesaRepository.findOneBy({id: id});

      console.log(`Resultado de la búsqueda: `, mesa);
      console.log(`id: `, id);
      console.log(`state: `, state);

      if (!mesa) throw new RpcException({
        message: 'Mesa no encontrada',
        status: HttpStatus.NOT_FOUND,
      });
      mesa.disponible = state;
      await this.mesaRepository.save(mesa);
      return { message: 'Estado de la mesa actualizado', status: HttpStatus.OK };
  }
}
