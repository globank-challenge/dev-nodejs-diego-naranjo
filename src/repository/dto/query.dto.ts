import { Type } from "class-transformer";
import { IsDate, IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

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
  @IsString()
  @IsIn(['E', 'D', 'A', 'e', 'd', 'a'])
  state?: string

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  coverage?: number
}