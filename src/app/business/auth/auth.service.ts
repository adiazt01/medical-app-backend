import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

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

    const token = await this.generateToken(user);

    return {
      access_token: token,
    };
  }

  async signUp(userRegisterDto: UserRegisterDto) {
    const { email, password, lastNames, firstNames } = userRegisterDto;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new UnauthorizedException('user already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      firstNames: firstNames,
      lastNames: lastNames,
    });

    if (newUser instanceof Error) {
      throw new InternalServerErrorException('Failed to create user');
    }

    const token = await this.generateToken(newUser);

    return {
      access_token: token,
    };
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstNames: user.firstNames,
      lastNames: user.lastNames,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
  }
}
