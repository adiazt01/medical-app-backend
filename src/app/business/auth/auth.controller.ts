import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRegisterDto } from 'src/app/hub/auth/dto/user-register.dto';

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
}
