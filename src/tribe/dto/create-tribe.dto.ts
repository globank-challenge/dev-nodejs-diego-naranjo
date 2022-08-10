
import { IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Organization } from "src/organization/entities/organization.entity";

export class CreateTribeDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  @IsPositive()
  status: number;

  @IsNumber()
  @IsPositive()
  organization: Organization;

}
