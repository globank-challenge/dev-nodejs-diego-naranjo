import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class QueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  tribe?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  date?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  state?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  coverage?: number
}