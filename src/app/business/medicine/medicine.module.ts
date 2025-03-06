import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { BusinessGuard } from '../auth/guards/business.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, BusinessGuard],
  imports: [AuthModule],
})
export class MedicineModule {}
