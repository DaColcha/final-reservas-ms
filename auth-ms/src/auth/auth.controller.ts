import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  ChangePasswordDto,
  LoginUserDto,
  ValidateTokenDto,
} from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @MessagePattern('changePassword')
  changePassword(@Payload() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @MessagePattern('login')
  login(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @MessagePattern('validateToken')
  async validateToken(@Payload() validateTokenDto: ValidateTokenDto) {
    const user = await this.authService.validateToken(validateTokenDto.token);
    if (!user) {
      return { isValid: false };
    }
    if (validateTokenDto.requiredRole !== '') {
      if (user.rol !== validateTokenDto.requiredRole) {
        return { isValid: false };
      }
    }
    return { user, isValid: true };
  }

  @MessagePattern('checkUserExistence')
  async checkUserExistence(@Payload() payload) {
    const user = await this.authService.findUserById(payload.userId);
    if (!user) {
      return { userExists: false };
    }
    return { userExists: true, user };
  }

  @MessagePattern('authStatus')
  checkAuthStatus(@Payload() user) {
    return this.authService.checkAuthStatus(user);
  }
}
