import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
} from 'class-validator';
import { CompanyEntity } from './../../../database/entities/company.entity';
import { JobSkillEntity } from './../../../database/entities/job-skill.entity';
import { JobEntity } from './../../../database/entities/job.entity';
import { LocationEntity } from './../../../database/entities/location.entity';
import { JobType } from './../../../database/enum/job-type.enum';
import { ProviderType } from './../../../database/enum/provider-type.enum';

export class CreateJobDto implements Partial<JobEntity> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  providerId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ProviderType)
  providerType: ProviderType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(JobType)
  jobType: JobType;

  @IsOptional()
  @IsNumber()
  @Max(40)
  experience?: number;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsDateString()
  postedDate: Date;

  @IsNotEmpty()
  @IsNumber()
  minAmount: number;

  @IsNotEmpty()
  @IsNumber()
  maxAmount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  remote?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  salaryRange?: string;

  @IsNotEmpty()
  @IsNumber()
  companyId?: number;

  @IsNotEmpty()
  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsArray()
  skillIds?: number[];

  company?: CompanyEntity;
  location?: LocationEntity;
  skills?: JobSkillEntity[];
}
