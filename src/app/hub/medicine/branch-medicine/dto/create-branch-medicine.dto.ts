import { IsInt } from "class-validator";

export class CreateBranchMedicineDto {
    @IsInt()
    branchId: number;

    @IsInt()
    medicineId: number;

    @IsInt()
    quantity: number;
}
