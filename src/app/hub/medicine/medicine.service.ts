import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine-query.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '@/common/database/prisma.service';
import { PaginationDto } from '@/common/database/dto/pagination.dto';
import { UploadService } from '@/common/upload/upload.service';
import { OptionsSearchMedicineQuery } from './dto/search-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    private prismaService: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      return await this.prismaService.medicine.create({
        data: {
          description: createMedicineDto.description,
          name: createMedicineDto.name,
          price: createMedicineDto.price,
          file: {
            connect: {
              id: createMedicineDto.fileId,
            },
          },
          therapeuticAction: {
            connect: {
              id: createMedicineDto.therapeuticActionId,
            },
          },
          presentation: {
            connect: {
              id: createMedicineDto.presentationId,
            },
          },
          mainComponent: {
            connect: {
              id: createMedicineDto.mainComponentId,
            },
          },
          laboratory: {
            connect: {
              id: createMedicineDto.laboratoryId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error); 
      throw new Error(error);
    }
  }

  async findAll(paginationDto: PaginationDto, optionsSearchMedicineQuery?: OptionsSearchMedicineQuery) {
    try {
      const limit = paginationDto.limit;
      const skip = paginationDto.skip;

      const { description, laboratoryName, mainComponentName, name, presentationName, price, therapeuticActionName } = optionsSearchMedicineQuery || {};

      const where: any = {};

      if (description) {
        where.description = { contains: description, mode: 'insensitive' };
      }
      if (laboratoryName) {
        where.laboratory = { name: { contains: laboratoryName, mode: 'insensitive' } };
      }
      if (mainComponentName) {
        where.mainComponent = { name: { contains: mainComponentName, mode: 'insensitive' } };
      }

      if (name) {
        where.name = { contains: name, mode: 'insensitive' };
      }

      if (presentationName) {
        where.presentation = { name: { contains: presentationName, mode: 'insensitive' } };
      }

      if (price) {
        where.price = price;
      }
      
      if (therapeuticActionName) {
        where.therapeuticAction = { name: { contains: therapeuticActionName, mode: 'insensitive' } };
      }

      const data = await this.prismaService.medicine.findMany({
        take: limit,
        skip: skip,
        where: where,
        include: {
          laboratory: true,
          mainComponent: true,
          presentation: true,
          therapeuticAction: true,
          file: true,
        },
      });

      const dataWithImage = await Promise.all(
        data.map(async (medicine) => {
          const imgUrl = await this.uploadService.getImage(medicine.file.path);
          console.log(imgUrl);
          (medicine.file as any).url = imgUrl.publicUrl;
          return medicine;
        }),
      );

      const totalCount = await this.prismaService.medicine.count({ where: where });

      return {
        data: dataWithImage,
        meta: {
          page: paginationDto.page,
          limit: paginationDto.limit,
          total: totalCount,
        },
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.medicine.findUnique({
        where: {
          id: id,
        },
        include: {
          laboratory: true,
          mainComponent: true,
          presentation: true,
          therapeuticAction: true,
          file: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    try {
      return await this.prismaService.medicine.update({
        where: {
          id: id,
        },
        data: {
          description: updateMedicineDto.description,
          name: updateMedicineDto.name,
          price: updateMedicineDto.price,
          file: {
            connect: {
              id: updateMedicineDto.fileId,
            },
          },
          therapeuticAction: {
            connect: {
              id: updateMedicineDto.therapeuticActionId,
            },
          },
          presentation: {
            connect: {
              id: updateMedicineDto.presentationId,
            },
          },
          mainComponent: {
            connect: {
              id: updateMedicineDto.mainComponentId,
            },
          },
          laboratory: {
            connect: {
              id: updateMedicineDto.laboratoryId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.medicine.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
