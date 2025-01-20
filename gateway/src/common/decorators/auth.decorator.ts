import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ValidRoles } from '../interfaces/valid-roles';

export function Auth(role?: ValidRoles) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard));
}
