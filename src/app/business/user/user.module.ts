import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserService } from './user.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [DatabaseModule, CartModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
