import { Injectable } from '@nestjs/common';
import { CreateMainComponentDto } from './dto/create-main-component.dto';
import { UpdateMainComponentDto } from './dto/update-main-component.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class MainComponentService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async create(createMainComponentDto: CreateMainComponentDto) {
    try {
      return await this.prismaService.mainComponent.create({
        data: {
          description: createMainComponentDto.description,
          name: createMainComponentDto.name
        } 
      });
    }  catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const skip = paginationDto.skip;
      const take = paginationDto.limit;

      return await this.prismaService.mainComponent.findMany({
        skip: skip,
        take: take
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.mainComponent.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateMainComponentDto: UpdateMainComponentDto) {
    try {
      return await this.prismaService.mainComponent.update({
        where: {
          id: id
        },
        data: {
          description: updateMainComponentDto.description,
          name: updateMainComponentDto.name
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.mainComponent.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
