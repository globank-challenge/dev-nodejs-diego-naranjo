import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateMetricDto {
  @IsNumber()
  @IsPositive()
  coverage: number;

  @IsInt()
  @IsPositive()
  bugs: number;

  @IsInt()
  @IsPositive()
  vulnerabilities: number;

  @IsInt()
  @IsPositive()
  hotspots: number;

  @IsInt()
  @IsPositive()
  code_smells: number;
}