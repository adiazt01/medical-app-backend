import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { Position } from '@prisma/client';

@Injectable()
export class PositionService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async create(createPositionDto: CreatePositionDto) : Promise<Position> {
    try {
      return await this.prismaService.position.create({
        data: {
          description: createPositionDto.description,
          name: createPositionDto.name
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(paginationDto: PaginationDto) : Promise<Position[]> {
    const skip = paginationDto.skip;
    const take = paginationDto.limit;
    
    try {
      return await this.prismaService.position.findMany({
        skip,
        take,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) : Promise<Position> {
    try {
      return await this.prismaService.position.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      return await this.prismaService.position.update({
        where: {
          id: id
        },
        data: {
          description: updatePositionDto.description,
          name: updatePositionDto.name
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.position.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
