import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetCart } from '@/common/decorators/get-cart.decorator';
import { UserApp } from '@/common/decorators/get-current-user-app.decorator';
import { User } from '@prisma/client';
import { APP } from '@/common/constants/prefix/app.prefix';
import { IPayloadToken } from '../auth/interface/payload.interface';

@Controller(APP.PAYMENTS)
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @GetCart() cartId: number, @UserApp() user: IPayloadToken) {
    return this.paymentService.create(createPaymentDto, cartId, user.sub);
  }
}
