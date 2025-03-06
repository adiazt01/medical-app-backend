import { IsInt, IsPositive } from "class-validator";

export class CreateCartItemDto {
    @IsInt()
    medicineId: number;

    @IsInt()
    @IsPositive()
    quantity: number = 1;

    @IsInt()
    cartId: number;
}
