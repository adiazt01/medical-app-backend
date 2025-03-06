import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartService } from '../cart.service';
import { MedicineService } from 'src/app/business/medicine/medicine.service';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
  providers: [CartItemService, CartService, MedicineService],
})
export class CartItemModule {}
