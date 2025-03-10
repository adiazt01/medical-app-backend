import { Injectable } from '@nestjs/common';
import { CreateBranchMedicineDto } from './dto/create-branch-medicine.dto';
import { UpdateBranchMedicineDto } from './dto/update-branch-medicine.dto';
import { BranchService } from 'src/app/hub/branch/branch.service';
import { MedicineService } from '../medicine.service';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class BranchMedicinesService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async findOneMedicineByBranchId(branchId: number, medicineId: number) {
    return await this.prismaService.branchMedicine.findFirst({
      where: {
        branch: {
          id: branchId
        },
        medicine: {
          id: medicineId
        }
      },
      include: {
        branch: true,
        medicine: true
      }
    });
  }
  
  async findOneByMedicineId(medicineId: number) {
    return await this.prismaService.branchMedicine.findMany({
      where: {
        medicine: {
          id: medicineId
        }
      },
      include: {
        branch: true,
        medicine: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.branchMedicine.findUnique({
      where: {
        id
      },
      include: {
        branch: true,
        medicine: true
      }
    });
  }
}
