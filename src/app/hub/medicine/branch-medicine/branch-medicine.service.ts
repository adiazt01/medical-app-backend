import { Injectable } from '@nestjs/common';
import { CreateBranchMedicineDto } from './dto/create-branch-medicine.dto';
import { UpdateBranchMedicineDto } from './dto/update-branch-medicine.dto';
import { PrismaService } from '@/common/database/prisma.service';
import { BranchMedicinePaginationDto } from './dto/branch-medicine-pagination.dto';

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

  async findAll(branchMedicinePagination?: BranchMedicinePaginationDto) {
    const { branchId, limit, medicineId, page, search, skip } = branchMedicinePagination;

    const where: any = {};

    if (branchId) {
      where.branchId = branchId;
    }

    if (medicineId) {
      where.medicineId = medicineId;
    }

    if (search) {
      where.OR = [
        {
          medicine: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    const data = await this.prismaService.branchMedicine.findMany({
      where,
      include: {
        branch: true,
        medicine: {
          include: {
            file: true
          }
        }
      },
      skip,
      take: limit
    });

    const count = await this.prismaService.branchMedicine.count({
      where
    });

    return {
      data: data,
      meta: {
        page,
        limit,
        total: count
      }
    }
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
