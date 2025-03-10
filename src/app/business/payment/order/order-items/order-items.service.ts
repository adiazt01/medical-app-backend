import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(
    private prismaService: PrismaService,
  ) {

  }

  async create(createOrderItemDto: CreateOrderItemDto) {
    const { medicineId, orderId, quantity } = createOrderItemDto;

    const orderItem = await this.prismaService.orderItem.create({
      data: {
        medicine: {
          connect: {
            id: medicineId,
          },
        },
        order: {
          connect: {
            id: orderId,
          },
        },
        quantity,
      }
    });

    return orderItem;
  }

  async findAll() {
    const orderItems = await this.prismaService.orderItem.findMany({
      include: {
        medicine: true,
        order: true,
      },
    });

    return orderItems;
  }

  async findOne(id: number) {
    return await this.prismaService.orderItem.findUnique({
      where: {
        id,
      },
      include: {
        medicine: true,
        order: true,
      },
    });
  }
}
