import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CartItemService } from '../user/cart/cart-item/cart-item.service';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    // private cartItemsService: CartItemService,
    // private paymentService: PaymentService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, cartId: number) {
    // Get cart items
    // const cartItems = await this.cartItemsService.findAll(cartId);

    // Validate cart items

    // Create order

    // Create order items from cart items

    // Create payment

    
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }
  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
