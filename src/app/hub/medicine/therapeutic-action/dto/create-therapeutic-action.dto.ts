import { IsOptional, IsString } from "class-validator";

export class CreateTherapeuticActionDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
