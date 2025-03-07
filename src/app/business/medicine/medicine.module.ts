import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/common/database/prisma.service';
<<<<<<< HEAD
import { BusinessGuard } from '../auth/guards/business.guard';
import { AuthModule } from '../auth/auth.module';
=======
import { AuthGuard } from '../auth/guards/auth.guard';
<<<<<<< HEAD
import { AuthModule } from '../auth/auth.module';
import { InvalidTokenService } from '../auth/invalid-token.service';
=======
import { BranchMedicinesModule } from './branch-medicines/branch-medicines.module';
>>>>>>> b21e2d5f26b444349e3164907cb69d4622915909
>>>>>>> origin

@Module({
  imports: [AuthModule],
  controllers: [MedicineController],
<<<<<<< HEAD
  providers: [MedicineService, PrismaService, BusinessGuard],
  imports: [AuthModule],
=======
  providers: [MedicineService, PrismaService, AuthGuard, AuthModule, InvalidTokenService],
  exports: [MedicineService],
  imports: [BranchMedicinesModule],
>>>>>>> origin
})
export class MedicineModule {}
