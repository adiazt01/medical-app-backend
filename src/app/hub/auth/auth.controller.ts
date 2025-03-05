import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthHubGuard } from './auth-hub/auth-hub.guard';
import { Permission } from '@prisma/client';
import { RequirePermission } from 'src/common/guards/permission/permission.decorator';
import { PermissionGuard } from 'src/common/guards/permission/permission.guard';

@Controller('hub/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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
  @Get('logout')
  @UseGuards(AuthHubGuard)
  async logout() {
    return 'logout';
  }
}
