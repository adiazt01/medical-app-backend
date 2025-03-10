import { IsIn, IsInt } from "class-validator";

export class CreateOrderItemDto {
    @IsInt()
    orderId: number;

    @IsInt()
    medicineId: number;

    @IsInt()
    quantity: number;
}
