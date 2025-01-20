import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/config';
import { ValidateTokenDto } from 'src/auth/dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    )
      ? this.reflector.get<string>('role', context.getHandler())
      : '';
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('No authorization header found');
      }

      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Send validation request to auth microservice
      const validationPayload = await firstValueFrom(
        this.authClient.send('validateToken', {
          token,
          requiredRole,
        } as ValidateTokenDto),
      );

      if (validationPayload.isValid === false) {
        throw new UnauthorizedException('Invalid provided token');
      }

      // Attach user to request object for use in controllers
      request.user = validationPayload.user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }
}
