import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | Error> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
