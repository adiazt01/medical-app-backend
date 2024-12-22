import { Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Laboratory } from '@prisma/client';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class LaboratoryService {
  constructor(private prismaService: PrismaService) {}

  create(createLaboratoryDto: CreateLaboratoryDto) : Promise<Laboratory> {
    try {
      const { address, email, name, phone} = createLaboratoryDto;

      const laboratory = this.prismaService.laboratory.create({
        data: {
          address, 
          email,
          name,
          phone,
        }
      })
      return laboratory;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const skip = paginationDto.skip;
      const take = paginationDto.limit;

      return await this.prismaService.laboratory.findMany({
        skip,
        take,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.laboratory.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
    try {
      const { address, email, name, phone} = updateLaboratoryDto;

      return await this.prismaService.laboratory.update({
        where: {
          id
        },
        data: {
          address, 
          email,
          name,
          phone,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.laboratory.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
