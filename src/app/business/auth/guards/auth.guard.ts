import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
<<<<<<<< HEAD:src/app/business/auth/guards/business.guard.ts
import { AuthService } from 'src/app/business/auth/auth.service';

@Injectable()
export class BusinessGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
========
import { IPayloadToken } from '../interface/payload.interface';
import { InvalidTokenService } from '../invalid-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private invalidTokenService: InvalidTokenService,
>>>>>>>> origin:src/app/business/auth/guards/auth.guard.ts
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

<<<<<<<< HEAD:src/app/business/auth/guards/business.guard.ts
    if (this.authService.isTokenInvalidated(token)) {
========
    if (this.invalidTokenService.isTokenInvalid(token)) {
>>>>>>>> origin:src/app/business/auth/guards/auth.guard.ts
      throw new UnauthorizedException('Token has been invalidated');
    }

    try {
      const payload: IPayloadToken = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET',
      });
      console.log(payload);
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
