import { IsString } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  token: string;

  @IsString()
  requiredRole: string;
}
