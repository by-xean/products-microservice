import { IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public page?: number = 1

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public limit?: number = 10
}