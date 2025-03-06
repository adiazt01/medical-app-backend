import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartService } from '../cart.service';
import { MedicineService } from 'src/app/business/medicine/medicine.service';
import { DatabaseModule } from '@/common/database/database.module';
import { InvalidTokenService } from 'src/app/business/auth/invalid-token.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
  providers: [CartItemService, CartService, MedicineService, InvalidTokenService],
})
export class CartItemModule {}
