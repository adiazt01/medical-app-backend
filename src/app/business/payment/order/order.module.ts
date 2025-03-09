import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [OrderItemsModule],
})
export class OrderModule {}
