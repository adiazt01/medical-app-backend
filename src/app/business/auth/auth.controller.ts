import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRegisterDto } from 'src/app/hub/auth/dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() UserLoginDto: UserLoginDto) {
    return this.authService.create();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  create(@Body() userRegister: UserRegisterDto) {
    return this.authService.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
