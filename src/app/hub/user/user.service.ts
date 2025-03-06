import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { Role, User } from '@prisma/client';

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

  async listAll(paginationDto?: PaginationDto) {
    try {
      const skip = paginationDto?.skip;
      const take = paginationDto?.limit;

      return await this.prismaService.user.findMany({
        skip,
        take,
      });
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
