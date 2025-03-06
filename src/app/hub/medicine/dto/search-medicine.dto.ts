import { IsOptional } from "class-validator";

export class OptionsSearchMedicineQuery {
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    laboratoryName: string;

    @IsOptional()
    mainComponentName: string;

    @IsOptional()
    presentationName: string;

    @IsOptional()
    therapeuticActionName: string;

    @IsOptional()
    price: number;
}