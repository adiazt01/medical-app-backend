import { IsEmail, IsString } from "class-validator";

export class CreateBranchDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;
}
