import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UserPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(Role)
    role: Role;
}