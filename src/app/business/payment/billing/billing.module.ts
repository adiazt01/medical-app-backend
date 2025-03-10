import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { PrismaService } from '@/common/database/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  controllers: [BillingController],
  providers: [BillingService, PrismaService],
  exports: [BillingService]
})
export class BillingModule {}
