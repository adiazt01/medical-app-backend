import { Injectable } from '@nestjs/common';
import { CreateTherapeuticActionDto } from './dto/create-therapeutic-action.dto';
import { UpdateTherapeuticActionDto } from './dto/update-therapeutic-action.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class TherapeuticActionService {
  constructor (
    private prismaService: PrismaService
  ) {}
  async create(createTherapeuticActionDto: CreateTherapeuticActionDto) {
    try {
      return await this.prismaService.therapeuticAction.create({
        data: {
          name: createTherapeuticActionDto.name,
          description: createTherapeuticActionDto.description
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    try {
      const skip = paginationDto?.skip;
      const limit = paginationDto?.limit;

      return await this.prismaService.therapeuticAction.findMany({
        take: limit,
        skip: skip
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.therapeuticAction.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTherapeuticActionDto: UpdateTherapeuticActionDto) {
    try {
      return await this.prismaService.therapeuticAction.update({
        where: {
          id: id
        },
        data: {
          name: updateTherapeuticActionDto.name,
          description: updateTherapeuticActionDto.description
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.therapeuticAction.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
