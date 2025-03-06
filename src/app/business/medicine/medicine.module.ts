import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { MedicineGuard } from './guards/medicine.guard';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, MedicineGuard],
})
export class MedicineModule {}
