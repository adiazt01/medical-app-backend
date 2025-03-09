import { PaymentMethod } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreatePaymentDto {
    @IsEnum(PaymentMethod)
    method: PaymentMethod;
}
