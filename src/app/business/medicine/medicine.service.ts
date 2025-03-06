import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class MedicineService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.medicine.findMany({
      include: {
        file: true,
        therapeuticAction: true,
        presentation: true,
        mainComponent: true,
        laboratory: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.medicine.findUnique({
      where: { id },
      include: {
        file: true,
        therapeuticAction: true,
        presentation: true,
        mainComponent: true,
        laboratory: true,
      },
    });
  }
}
