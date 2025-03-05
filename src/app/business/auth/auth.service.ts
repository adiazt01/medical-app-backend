import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user instanceof Error) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid email or password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      permission: user.permission || 'default_permission',
      userType: user.userType,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async signUp(userRegisterDto: UserRegisterDto) {
    const { email, password, name } = userRegisterDto;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new UnauthorizedException('user already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      name,
    });

    if (newUser instanceof Error) {
      throw new InternalServerErrorException('Failed to create user');
    }

    const payload = {
      email: newUser.email,
      sub: newUser.id,
      permission: newUser.permission,
      userType: newUser.userType,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async getAll() {
    return this.userService.getAll();
  }
}
