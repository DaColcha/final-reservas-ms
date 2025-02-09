import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateReservaDto {
  @IsString()
  @Transform(
    ({ value }) => {
      // First, validate that we have a string
      if (typeof value !== 'string') {
        throw new BadRequestException('La fecha debe ser una cadena de texto');
      }

      // Check for dd-mm-yyyy format
      const ddmmyyyyFormat = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
      if (ddmmyyyyFormat) {
        const [_, day, month, year] = ddmmyyyyFormat;
        // Validate date components
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        // Basic date validation
        if (monthNum < 1 || monthNum > 12) {
          throw new BadRequestException('Mes inválido');
        }
        if (dayNum < 1 || dayNum > 31) {
          throw new BadRequestException('Día inválido');
        }

        // Format with padding
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      // Check for yyyy-mm-dd format
      const yyyymmddFormat = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      if (yyyymmddFormat) {
        return value;
      }

      throw new BadRequestException(
        'La fecha debe estar en el formato dd-mm-yyyy o yyyy-mm-dd',
      );
    },
    { toClassOnly: true },
  )
  fecha: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'La hora debe estar en el formato hh:mm',
  })
  hora: string;

  @IsInt()
  @IsPositive()
  cantidadPersonas: number;

  @IsString()
  @IsOptional()
  observaciones: string;

  @IsString()
  usuarioId: string;
}
