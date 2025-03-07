import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async signIn(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedException('Invalid email or password');
    }

    const token = await this.generateToken(user);

    return {
      access_token: token,
    }
  }

  async signUp(userRegisterDto: UserRegisterDto) {
    const { email, password, lastNames, firstNames } = userRegisterDto;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({ email, password: hashedPassword, firstNames, lastNames, role: userRegisterDto.role });

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
