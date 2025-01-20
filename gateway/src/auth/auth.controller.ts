import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Inject,
  Req,
  Param,
} from '@nestjs/common';
import { CreateUserDto, ChangePasswordDto, LoginUserDto } from './dto';
import { AUTH_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authClient.send('register', createUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authClient.send('changePassword', changePasswordDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authClient.send('login', loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('auth-status')
  @Auth()
  checkAuthStatus(@Req() request) {
    const user = request.user;
    return this.authClient.send('authStatus', user).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('check-user-existence/:userId')
  checkUserExistence(@Param() userId: string) {
    return this.authClient.send('checkUserExistence', userId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
