import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { InvalidTokenService } from '../auth/invalid-token.service';
import { BranchMedicinesModule } from './branch-medicines/branch-medicines.module';

@Module({
  imports: [AuthModule, BranchMedicinesModule],
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, AuthGuard, AuthModule, InvalidTokenService],
  exports: [MedicineService],
})
export class MedicineModule {}
