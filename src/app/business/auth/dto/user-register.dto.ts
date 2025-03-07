import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstNames: string;

  @IsNotEmpty()
  @IsString()
  lastNames: string;
}
