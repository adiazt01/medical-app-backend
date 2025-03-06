import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstNames: string;

    @IsString()
    @IsNotEmpty()
    lastNames: string;

    @IsEnum(
        Role,
        {
            message: `Invalid role. Valid roles are ${Object.values(Role).join(', ')}`,
        }
    )
    @IsOptional()
    role: string = Role.USER;
}