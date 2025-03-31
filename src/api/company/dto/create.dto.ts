import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CompanyEntity } from 'src/database/entities/company.entity';

export class CreateCompanyDto implements Partial<CompanyEntity> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  industry: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  website: string;
}
