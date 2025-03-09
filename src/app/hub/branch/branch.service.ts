import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class BranchService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    try {
      return await this.prismaService.branch.create({
        data: {
          address: createBranchDto.address,
          email: createBranchDto.email,
          name: createBranchDto.name,
          phone: createBranchDto.phone,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, page, search, skip } = paginationDto;
      
      const where: any = {}

      if (search) {
        where.OR = [
          {
            name: {
              contains: search, mode: 'insensitive'
            }
          },
          {
            address: {
              contains: search, mode: 'insensitive'
            }
          },
          {
            email: {
              contains: search, mode: 'insensitive'
            }
          },
          {
            phone: {
              contains: search, mode: 'insensitive'
            }
          }
        ]
      }

      const total = await this.prismaService.branch.count({
        where
      });

      const data = await this.prismaService.branch.findMany({
        where,
        skip,
        take: limit
      });

      return {
        data,
        meta: {
          total,
          limit,
          page,
          search
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.branch.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    try {
      return await this.prismaService.branch.update({
        where: {
          id
        },
        data: {
          address: updateBranchDto.address,
          email: updateBranchDto.email,
          name: updateBranchDto.name,
          phone: updateBranchDto.phone,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.branch.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
