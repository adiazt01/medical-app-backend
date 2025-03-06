import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { MedicineService } from 'src/app/business/medicine/medicine.service';
import { CartService } from '../cart.service';

@Injectable()
export class CartItemService {
  constructor (
    private readonly medicineService: MedicineService,
    private readonly cartService: CartService
  ) {}
  
  async create(createCartItemDto: CreateCartItemDto, cartId: number) {
    const { medicineId, quantity } = createCartItemDto;

    const medicine = await this.medicineService.findOne(medicineId);

    if (!medicine) {
      
    }

  }

  findAll() {
    return `This action returns all cartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
