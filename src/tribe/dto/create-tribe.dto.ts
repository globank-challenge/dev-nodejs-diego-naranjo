
import { IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateTribeDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  @IsPositive()
  status: number;

}
