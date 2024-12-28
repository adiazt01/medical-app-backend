import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMedicineDto {
    @IsString()
    name: string;   

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    urlImage: string;

    @IsNumber()
    price: number;

    @IsNumber()
    fileId: number;

    @IsNumber()
    therapeuticActionId: number;

    @IsNumber()
    presentationId: number;

    @IsNumber()
    mainComponentId: number;

    @IsNumber()
    laboratoryId: number;
}       
