import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { Permission, User, UserType } from '@prisma/client';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

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
          userType: UserType.MODERATOR,
          permission: Permission.ADMIN,
          name: userRegisterDto.name,
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
