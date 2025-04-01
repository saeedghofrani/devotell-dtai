import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from './../../../common/pagination/page-filter.dto';
import { JobType } from './../../../database/enum/job-type.enum';

export class JobFilterDto extends BaseFilterDto {
    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    minSalary?: number;

    @IsOptional()
    @IsNumber()
    maxSalary?: number;

    @IsOptional()
    @IsEnum(JobType)
    jobType?: JobType;

    @IsOptional()
    @IsString()
    skill?: string;
}