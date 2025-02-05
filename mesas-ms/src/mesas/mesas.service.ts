import { Injectable } from '@nestjs/common';
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

      if(!mesas) throw new RpcException("No hay mesas disponibles");

      const mesaAdecuada = mesas.find(mesa =>
          mesa.numeroPersonas >= num && mesa.numeroPersonas <= (num + 2));

      if (!mesaAdecuada) throw new RpcException("No hay mesas disponibles para la cantidad de personas solicitadas");

      return mesaAdecuada
  }

  async updateState(id: number, state : boolean){
      const mesa = await this.mesaRepository.findOneBy({id: id});
      if (!mesa) throw new RpcException("Mesa no encontrada");
      mesa.disponible = state;
      await this.mesaRepository.save(mesa);
  }
}
