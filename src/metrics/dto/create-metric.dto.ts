import { IsInt, IsNumber, IsPositive } from "class-validator";
import { Repository } from "src/repository/entities/repository.entity";

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

  @IsNumber()
  @IsPositive()
  repository: Repository
}