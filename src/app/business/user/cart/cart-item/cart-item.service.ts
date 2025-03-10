import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { BranchMedicinesService } from 'src/app/business/medicine/branch-medicines/branch-medicines.service';
import { PrismaService } from '@/common/database/prisma.service';

@Injectable()
export class CartItemService {
  constructor(
    private branchMedicineService: BranchMedicinesService,
    private prismaService: PrismaService
  ) { }

  async create(createCartItemDto: CreateCartItemDto, cartId: number) {
    const { branchMedicineId, quantity } = createCartItemDto;

    const branchMedicine = await this.branchMedicineService.findOne(branchMedicineId);
    console.log(branchMedicine);
    if (!branchMedicine) {
      throw new NotFoundException('Medicine not found or not available in this branch');
    }

    if (branchMedicine.quantity < quantity) {
      throw new NotFoundException('Medicine stock is not enough');
    }

    const cartItem = await this.prismaService.cartItem.create({
      data: {
        quantity: quantity,
        cart: {
          connect: {
            id: cartId
          }
        },
        branchMedicine: {
          connect: {
            id: branchMedicineId
          }
        }
      }
    });

    return cartItem;
  }

  async findAll(cartId: number) {
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        cart: {
          id: cartId
        }
      },
      include: {
        branchMedicine: {
          include: {
            medicine: {
              include: {
                file: true,
                laboratory: true
              },
            },
            branch: true
          }
        }
      },
    });

    let total = 0;
    if (cartItems?.length !== 0) {
      console.log(cartItems);
      total = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.branchMedicine.medicine.price;
      }, 0);
    }

    return {
      data: cartItems,
      meta: {
        total: total
      }
    };
  }

  // async findOne(id: number) {
  //   return await this.prismaService.cartItem.findUnique({
  //     where: {
  //       id: id
  //     },
  //     include: {
  //       medicine: true,
  //       cart: true
  //     }
  //   });
  // }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return await this.prismaService.cartItem.update({
      where: {
        id: id
      },
      data: updateCartItemDto
    });
  }

  async remove(id: number) {
    return await this.prismaService.cartItem.delete({
      where: {
        id: id
      }
    });
  }

  async removeAll(cartId: number) {
    return await this.prismaService.cartItem.deleteMany({
      where: {
        cart: {
          id: cartId
        }
      }
    });
  }

  async validateAndUpdateStock(cartItems: any[]) {
    for (const cartItem of cartItems) {
      const hasStock = cartItem.branchMedicine.quantity >= cartItem.quantity;

      console.log(cartItem.branchMedicine.quantity, cartItem.quantity);

      if (!hasStock) {
        await this.update(cartItem.id, {
          quantity: cartItem.branchMedicine.quantity,
        });
        throw new NotFoundException('Stock is not enough');
      }
    }
  }
}
