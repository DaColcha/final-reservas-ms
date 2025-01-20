import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  usuario: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsString()
  @MinLength(4)
  nombreCompleto: string;

  @IsString()
  @IsIn(['client', 'admin'])
  rol: string;
}
