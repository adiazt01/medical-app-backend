<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from 'src/app/hub/auth/dto/user-register.dto';
import { AuthGuard } from '@nestjs/passport';
=======
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthGuard } from './guards/auth.guard';
>>>>>>> origin

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signIn(userLoginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.signUp(userRegisterDto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    await this.authService.logout(token);
    return { message: 'Logout successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Body('token') token: string) {
    return this.authService.logout(token);
  }
}
