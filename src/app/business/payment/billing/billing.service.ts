import { Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class BillingService {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  async create(createBillingDto: CreateBillingDto) {
    const { orderId, paymentId, userId } = createBillingDto;

    const billing = await this.prismaService.billing.create({
      data: {
        payment: {
          connect: {
            id: paymentId,
          }
        },
        order: {
          connect: {
            id: orderId,
          }
        },
        user: {
          connect: {
            id: userId,
          }
        }
      }
    });

    return billing;
  }

  async findAll() {
    return await this.prismaService.billing.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.billing.findUnique({
      where: {
        id,
      }
    });
  }
}
