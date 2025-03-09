import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { MedicinePaginationDto } from './dto/medicine-pagination.dto';

@Injectable()
export class MedicineService {
  constructor(private prismaService: PrismaService) {}

  async findAll(medicinePaginationDto: MedicinePaginationDto) {
    const { categoriesSelected, limit, maxPrice, minPrice, onlyInStock, page, search, skip,  } = medicinePaginationDto;
    
    const where: any = {}

    if (search && search !== '') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (minPrice !== null && maxPrice !== null) {
      where.price = { gte: minPrice, lte: maxPrice }
    }

    // Ejecutar consultas en paralelo
    const [data, totalCount, minPriceProduct, maxPriceProduct] = await Promise.all([
      this.prismaService.medicine.findMany({
        where,
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          file: {
            select: {
              id: true,
              path: true,
            },
          },
          therapeuticAction: {
            select: {
              id: true,
              name: true,
            },
          },
          presentation: {
            select: {
              id: true,
              name: true,
            },
          },
          mainComponent: {
            select: {
              id: true,
              name: true,
            },
          },
          laboratory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      this.prismaService.medicine.count({ where }),
      this.prismaService.medicine.findFirst({
        orderBy: { price: 'asc' },
        select: { price: true },
      }),
      this.prismaService.medicine.findFirst({
        orderBy: { price: 'desc' },
        select: { price: true },
      }),
    ]);

    return {
      data: data,
      meta: {
        page: page,
        limit: limit,
        total: totalCount,
        minPrice: minPriceProduct?.price ?? 0,
        maxPrice: maxPriceProduct?.price ?? 0,
      },
    };
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
