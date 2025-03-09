import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetCart } from '@/common/decorators/get-cart.decorator';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
create(@Body() createPaymentDto: CreatePaymentDto, @GetCart() cartId: number) {
    return this.paymentService.create(createPaymentDto, cartId);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }
}
