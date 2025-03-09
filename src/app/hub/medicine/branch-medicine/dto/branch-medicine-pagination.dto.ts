import { PaginationDto } from "@/common/database/dto/pagination.dto";
import { IsNumber, IsOptional } from "class-validator";

export class BranchMedicinePaginationDto extends PaginationDto {
    @IsOptional()
    @IsNumber()
    branchId: number;

    @IsOptional()
    @IsNumber()
    medicineId: number;
}