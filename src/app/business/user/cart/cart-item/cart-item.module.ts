import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartService } from '../cart.service';
import { MedicineService } from 'src/app/business/medicine/medicine.service';
import { DatabaseModule } from '@/common/database/database.module';
<<<<<<< HEAD
import { InvalidTokenService } from 'src/app/business/auth/invalid-token.service';
=======
import { BranchMedicinesService } from 'src/app/business/medicine/branch-medicines/branch-medicines.service';
>>>>>>> b21e2d5f26b444349e3164907cb69d4622915909

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
<<<<<<< HEAD
  providers: [CartItemService, CartService, MedicineService, InvalidTokenService],
=======
  providers: [CartItemService, CartService, MedicineService, BranchMedicinesService],
>>>>>>> b21e2d5f26b444349e3164907cb69d4622915909
})
export class CartItemModule {}
