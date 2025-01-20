import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(4)
  usuario: string;

  @IsString()
  @MinLength(6)
  contrasena: string;
}
