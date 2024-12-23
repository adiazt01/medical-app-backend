import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class PresentationService {
  constructor(private prisma: PrismaService) {}
  
  async create(createPresentationDto: CreatePresentationDto) {
   try {
    return await this.prisma.presentation.create({
      data: {
        name: createPresentationDto.name,
        description: createPresentationDto.description
      }
    });
   } catch (error) {
      throw new Error(error);
   }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const limit = paginationDto.limit;
    const skip = paginationDto.skip;

    return await this.prisma.presentation.findMany({
      take: limit,
      skip: skip
    });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.presentation.findUnique({
      where: {
        id: id
      }
    });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updatePresentationDto: UpdatePresentationDto) {
    try {
      return await this.prisma.presentation.update({
      where: {
        id: id
      },
      data: {
        name: updatePresentationDto.name,
        description: updatePresentationDto.description
      }
    });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.presentation.delete({
      where: {
        id: id
      }
    });
    } catch (error) {
      throw new Error(error);
    }
  }
}
