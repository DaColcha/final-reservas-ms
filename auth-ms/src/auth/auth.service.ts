import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    try {
      const { contrasena, ...userData } = createAuthDto;

      const user = this.userRepository.create({
        ...userData,
        contrasena: await bcrypt.hashSync(contrasena, 10),
      });

      await this.userRepository.save(user);

      delete user.contrasena; //eliminamos del objeto para poder enviarlo como parte de la respuesta

      return {
        ...user,
        token: this.jwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async changePassword(changePassword: ChangePasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { usuario: changePassword.username },
      });
      if (!user) throw new BadRequestException('Usuario no encontrado');

      user.contrasena = bcrypt.hashSync(changePassword.contrasena, 10);

      await this.userRepository.save(user);
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { usuario, contrasena } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { usuario },
      select: {
        usuario: true,
        contrasena: true,
        id: true,
        nombreCompleto: true,
        rol: true,
      },
    });

    if (!user)
      throw new BadRequestException('El usuario o contraseña es incorrecto');

    if (!bcrypt.compareSync(contrasena, user.contrasena))
      throw new BadRequestException('El usuario o contraseña es incorrecto');

    //Retornamos el token para contiuar en la sesion
    delete user.contrasena;
    return {
      ...user,

      token: this.jwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.jwtToken({ id: user.id }),
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token) as JwtPayload;
      return await this.findUserById(payload.id);
    } catch {
      throw new BadRequestException('Token invalido');
    }
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  private jwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private handleDbError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new Error('Unexpected database error');
  }
}
