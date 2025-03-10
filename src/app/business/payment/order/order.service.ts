import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '@/common/database/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor (
    private prismaService: PrismaService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId } = createOrderDto;
    console.log(userId)
    return await this.prismaService.order.create({
      data: {
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
