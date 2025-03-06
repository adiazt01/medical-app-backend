import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, AuthGuard],
})
export class MedicineModule {}
