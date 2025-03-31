import { CreateCompanyDto } from 'src/api/company/dto/create.dto';
import { CreateJobDto } from 'src/api/job/dto/create.dto';
import { CreateLocationDto } from 'src/api/location/dto/create.dto';
import { CreateSkillDto } from 'src/api/skill/dto/create.dto';

export interface INormalizaedProviderResponse {
  job: CreateJobDto;
  jobSkills: CreateSkillDto[];
  company: CreateCompanyDto;
  location: CreateLocationDto;
}
