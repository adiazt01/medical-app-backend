import { UserRegisterDto } from '../auth/dto/user-register.dto';

import { Injectable } from '@nestjs/common';
import { User, Role } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOneByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
        include: {
          Cart: true,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(userRegisterDto: UserRegisterDto): Promise<User | Error> {
    return await this.prismaService.user.create({
      data: {
        email: userRegisterDto.email,
        password: userRegisterDto.password,
        firstNames: userRegisterDto.firstNames,
        lastNames: userRegisterDto.lastNames,
        role: Role.USER,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
