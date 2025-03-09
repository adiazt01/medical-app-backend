import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { APP } from '@/common/constants/prefix/app.prefix';
import { AuthGuard } from 'src/app/business/auth/guards/auth.guard';
import { GetCart } from '@/common/decorators/get-cart.decorator';

@Controller(APP.CARTS)
@UseGuards(AuthGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto, @GetCart() cartId: number) {
    return this.cartItemService.create(createCartItemDto, cartId);
  }

  @Get()
  findAll(@GetCart() cartId: number) {
    return this.cartItemService.findAll(cartId);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.cartItemService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemService.remove(id);
  }
}
