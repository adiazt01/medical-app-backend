import { PaginationDto } from "@/common/database/dto/pagination.dto";
import { IsArray, IsBoolean, IsOptional, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class MedicinePaginationDto extends PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice: number | null = null;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice: number | null = null;

    @IsOptional()
    @IsBoolean()
    onlyInStock: boolean = false;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categoriesSelected: string[];
}