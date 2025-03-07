import {
  Injectable,
  UnauthorizedException,
<<<<<<< HEAD
  InternalServerErrorException,
=======
  InternalServerErrorException 
>>>>>>> origin
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { IPayloadToken } from './interface/payload.interface';
import { CartService } from '../user/cart/cart.service';
import { InvalidTokenService } from './invalid-token.service';

@Injectable()
export class AuthService {
  private invalidatedTokens: Set<string> = new Set();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cartService: CartService,
    private invalidTokenService: InvalidTokenService,
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

  async logout(token: string) {
    this.invalidTokenService.addToken(token);
  }

  async logout(token: string) {
    this.invalidatedTokens.add(token);
    return { message: 'Logged out successfully!' };
  }

  isTokenInvalidated(token: string): boolean {
    return this.invalidatedTokens.has(token);
  }
}
