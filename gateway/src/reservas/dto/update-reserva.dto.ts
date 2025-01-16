import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsIn, IsOptional, IsUUID } from 'class-validator';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @IsIn(['solicitada', 'confirmada', 'cancelada', 'finalizada'])
  @IsOptional()
  estado?: string;
}
