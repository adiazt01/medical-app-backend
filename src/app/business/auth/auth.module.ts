import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CartService } from '../user/cart/cart.service';
import { DatabaseModule } from '@/common/database/database.module';
import { InvalidTokenService } from './invalid-token.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
=======
  providers: [AuthService, JwtStrategy, CartService, InvalidTokenService],
  exports: [InvalidTokenService],
>>>>>>> origin
})
export class AuthModule {}
