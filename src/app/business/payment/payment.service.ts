import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CartItemService } from '../user/cart/cart-item/cart-item.service';
import { PrismaService } from '@/common/database/prisma.service';
import { OrderService } from './order/order.service';
import { OrderItemsService } from './order/order-items/order-items.service';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private cartItemsService: CartItemService,
    private orderService: OrderService,
    private orderItemsService: OrderItemsService,
  ) { }

  async create(createPaymentDto: CreatePaymentDto, cartId: number, userId: number) {
    const cartItems = await this.cartItemsService.findAll(cartId);
    console.log(userId)
  
    if (cartItems.data === null || cartItems.data.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Validate if stock is enough
    await this.cartItemsService.validateAndUpdateStock(cartItems.data);

    // Create order
    const order = await this.orderService.create({
      userId,
    })

    // Create order items from cart items
    for (const cartItem of cartItems.data) {
      await this.orderItemsService.create({
        orderId: order.id,
        medicineId: cartItem.branchMedicine.medicine.id,
        quantity: cartItem.quantity,
      })
    }

    const totalAmount = cartItems.data.reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.branchMedicine.medicine.price;
    }, 0);

    // Create payment
    const payment = await this.prismaService.payment.create({
      data: {
        method: createPaymentDto.method as PaymentMethod,
        amount: totalAmount,
      }
    });

    // Reduce stock
    for (const cartItem of cartItems.data) {
      await this.prismaService.branchMedicine.update({
        where: {
          id: cartItem.branchMedicine.id,
        },
        data: {
          quantity: {
            decrement: cartItem.quantity
          }  
        }
      });
    }

    // Create billing
    const billing = await this.prismaService.billing.create({
      data: {
        payment: {
          connect: {
            id: payment.id,
          }
        },
        order: {
          connect: {
            id: order.id,
          }
        },
        user: {
          connect: {
            id: userId,
          }
        },
      },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                medicine: true,
              }
            },
          }
        },
        payment: true,
      }
    })

    // Clear cart
    await this.cartItemsService.removeAll(cartId);

    return billing;
  }
}
