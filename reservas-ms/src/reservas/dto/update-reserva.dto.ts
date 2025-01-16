import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsIn, IsOptional, IsUUID } from 'class-validator';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @IsUUID()
  id: string;

  @IsIn(['solicitada', 'confirmada', 'cancelada', 'finalizada'])
  @IsOptional()
  estado?: string;
}
