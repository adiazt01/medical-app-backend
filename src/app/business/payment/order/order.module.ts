import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemsModule } from './order-items/order-items.module';
import { DatabaseModule } from '@/common/database/database.module';
import { PrismaService } from '@/common/database/prisma.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, AuthGuard],
  imports: [OrderItemsModule, DatabaseModule, AuthModule],
  exports: [OrderService],
})
export class OrderModule {}
