import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateLaboratoryDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
}
