import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from 'src/app/hub/auth/dto/user-register.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @HttpCode(HttpStatus.OK)
  @Get('clients')
  async getAll() {
    return this.authService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Body('token') token: string) {
    return this.authService.logout(token);
  }
}
