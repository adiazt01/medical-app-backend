import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { IPayloadToken } from './interface/payload.interface';
import { CartService } from '../user/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cartService: CartService,
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

    const token = await this.generateToken(user, user.Cart.id);

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

    const cart = await this.cartService.create({
      userId: newUser.id,
    });

    if (cart instanceof Error) {
      throw new InternalServerErrorException('Failed to create cart');
    }

    const token = await this.generateToken(newUser, cart.id);

    return {
      access_token: token,
    };
  }

  private async generateToken(user: User, cartId: number): Promise<string> {
    const payload: IPayloadToken = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstNames: user.firstNames,
      lastNames: user.lastNames,
      cartId: cartId,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
  }
}
