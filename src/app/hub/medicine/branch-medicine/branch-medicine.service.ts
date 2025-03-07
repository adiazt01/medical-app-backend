import { Injectable } from '@nestjs/common';
import { CreateBranchMedicineDto } from './dto/create-branch-medicine.dto';
import { UpdateBranchMedicineDto } from './dto/update-branch-medicine.dto';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class BranchMedicineService {
  constructor(
    private prismaService: PrismaService
  ) { }

  // Create a disponibility of a medicine in a branch
  async create(createBranchMedicineDto: CreateBranchMedicineDto) {
    const { branchId, medicineId, quantity } = createBranchMedicineDto;

    return await this.prismaService.branchMedicine.create({
      data: {
        branchId,
        medicineId,
        quantity
      }
    });
  }

  async findOne(id: number) {
    const branchMedicine = await this.prismaService.branchMedicine.findUnique({
      where: {
        id
      },
      include: {
        branch: true,
        medicine: true
      }
    });

    return branchMedicine;
  }

  async findByBranch(branchId: number) {
    const branchMedicines = await this.prismaService.branchMedicine.findMany({
      where: {
        branchId
      },
      include: {
        medicine: true
      }
    });

    return branchMedicines;
  }

  async update(id: number, updateBranchMedicineDto: UpdateBranchMedicineDto) {
    const { quantity } = updateBranchMedicineDto;

    return await this.prismaService.branchMedicine.update({
      where: {
        id
      },
      data: {
        quantity
      }
    });
  }

  async remove(id: number) {
    return await this.prismaService.branchMedicine.delete({
      where: {
        id
      }
    });
  }
}
