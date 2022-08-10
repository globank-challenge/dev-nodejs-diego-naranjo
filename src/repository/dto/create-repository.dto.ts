
import { IsDate, IsIn, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { Tribe } from "src/tribe/entities/tribe.entity";

export class CreateRepositoryDto {

  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsIn(['E', 'D', 'A'])
  state: string;

  @IsDate()
  create_time: string;

  @IsString()
  @IsIn(['A', 'I'])
  status: string;

  @IsNumber()
  @IsPositive()
  tribe: Tribe
}