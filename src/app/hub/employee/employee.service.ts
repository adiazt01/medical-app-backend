import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) { }

  create(createEmployeeDto: CreateEmployeeDto,
  ) {
    try {
      return this.prismaService.employee.create({
        data: {
          firstName: createEmployeeDto.firstName,
          lastName: createEmployeeDto.lastName,
          startDate: createEmployeeDto.startDate,
          branch: {
            connect: {
              id: createEmployeeDto.branchId
            }
          },
          position: {
            connect: {
              id: createEmployeeDto.positionId
            },
          },
          ...(createEmployeeDto.userId && {
            user: {
              connect: { id: createEmployeeDto.userId },
            },
          }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const skip = paginationDto.skip;
    const take = paginationDto.limit;
    
    try {
      return this.prismaService.employee.findMany({
        skip,
        take,
        include: {
          branch: true,
          position: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prismaService.employee.findUnique({
        where: {
          id: id,
        },
        include: {
          branch: true,
          position: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return this.prismaService.employee.update({
        where: {
          id: id,
        },
        data: {
          firstName: updateEmployeeDto.firstName,
          lastName: updateEmployeeDto.lastName,
          startDate: updateEmployeeDto.startDate,
          endDate: updateEmployeeDto.endDate,
          branch: {
            connect: {
              id: updateEmployeeDto.branchId
            }
          },
          position: {
            connect: {
              id: updateEmployeeDto.positionId
            },
          },
          user: {
            connect: {
              id: updateEmployeeDto.userId
            },
          },
        },
      });
    }
    catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    try {
      return this.prismaService.employee.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}