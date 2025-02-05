import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MesasService } from './mesas.service';

@Controller()
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @MessagePattern('findAvailableMesa')
  findAvailable(@Payload() num: number) {
    return this.mesasService.findAvailable(num);
  }

  @MessagePattern('updateStateMesa')
  updateState(@Payload() data: {id: number, state : boolean}) {
    console.log(`Microservicio recibió solicitud:`, data);
    return this.mesasService.updateState(data.id, data.state);
  }

}
