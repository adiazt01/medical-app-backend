import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsInt()
    @IsOptional()
    userId: number;
  
    @IsInt()
    branchId: number;
  
    @IsInt()
    positionId: number;
  
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsDateString()
    startDate: string;
  
    @IsOptional()
    @IsDateString()
    endDate?: string;
  }