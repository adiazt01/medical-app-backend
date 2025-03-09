import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { Role, User } from '@prisma/client';
import { UserPaginationDto } from './dto/user-pagination.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async findOneByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          email: userRegisterDto.email,
          password: userRegisterDto.password,
          firstNames: userRegisterDto.firstNames,
          lastNames: userRegisterDto.lastNames,
          role: Role[userRegisterDto.role.toString().toUpperCase()],
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(paginationDto?: UserPaginationDto) {
    try {
      const skip = paginationDto?.skip;
      const { limit, search, role } = paginationDto;

      const where: any = {};

      if (search && search !== '') {
        where.OR = [
          { lastNames: { contains: search, mode: 'insensitive' } },
          { firstNames: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ];

      }
      
      if (role) {
        where.role = role;
      }

      console.log(where)

      const users = await this.prismaService.user.findMany({
        skip: skip,
        take: limit,
        where: where,
      });

      const totalCount = await this.prismaService.user.count({ where });

      return {
        data: users,
        meta: {
          page: paginationDto.page,
          limit: paginationDto.limit,
          total: totalCount,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneById(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
