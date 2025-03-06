import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BranchMedicinesModule } from './branch-medicines/branch-medicines.module';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, AuthGuard],
  exports: [MedicineService],
  imports: [BranchMedicinesModule],
})
export class MedicineModule {}
