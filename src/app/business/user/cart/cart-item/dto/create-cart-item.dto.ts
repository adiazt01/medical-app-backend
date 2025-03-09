import { IsInt, IsPositive } from "class-validator";

export class CreateCartItemDto {
    @IsInt()
    @IsPositive()
    branchMedicineId: number;

    @IsInt()
    @IsPositive()
    quantity: number = 1;
}
