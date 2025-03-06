import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from '@/common/database/prisma.service';
import { CartItemModule } from './cart-item/cart-item.module';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [CartItemModule, DatabaseModule],
  controllers: [],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
