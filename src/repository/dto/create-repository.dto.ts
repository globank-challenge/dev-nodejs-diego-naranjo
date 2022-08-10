
import { IsDate, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRepositoryDto {

  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1)
  state: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1)
  status: string;
}