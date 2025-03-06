import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class CartService {
  constructor (
    private prisma: PrismaService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    return await this.prisma.cart.create({
      data: {
        user: {
          connect: {
            id: createCartDto.userId
          }
        },
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.cart.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        cartItems: {
          include: {
            medicine: true
          }
        }
      }
    })
  }

  async findOneByUserId(userId: number) {
    return await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    })
  }
}
