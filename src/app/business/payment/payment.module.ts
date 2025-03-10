import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BranchMedicinesModule } from '../medicine/branch-medicines/branch-medicines.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '@/common/database/prisma.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { InvalidTokenService } from '../auth/invalid-token.service';
import { OrderModule } from './order/order.module';
import { CartItemModule } from '../user/cart/cart-item/cart-item.module';
import { OrderItemsModule } from './order/order-items/order-items.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [AuthModule, BranchMedicinesModule, OrderModule, CartItemModule, OrderModule, OrderItemsModule, BillingModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, AuthGuard, AuthModule, InvalidTokenService],
})
export class PaymentModule {}
