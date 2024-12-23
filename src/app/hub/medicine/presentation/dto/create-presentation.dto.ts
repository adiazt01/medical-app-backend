import { IsOptional, IsString } from "class-validator";

export class CreatePresentationDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}
