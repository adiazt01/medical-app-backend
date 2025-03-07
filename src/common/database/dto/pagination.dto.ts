import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public limit = 10;

  @IsOptional()
  @IsString()
  public sort: string;

  @IsOptional()
  @IsString()
  public search: string;

  public get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
