import { IsOptional, IsString } from "class-validator";

export class CreateMainComponentDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}
