import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class TribeDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  tribe?: number
}