import { IsInt } from "class-validator";

export class CreateBillingDto {
    @IsInt()
    orderId: number;

    @IsInt()
    paymentId: number;

    @IsInt()
    userId: number;
}
