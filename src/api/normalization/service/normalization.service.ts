import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './../../../api/company/dto/create.dto';
import { IFirstProviderJob } from './../../../external-services/devotel/interface/first-provider.interface';
import { INormalizaedProviderResponse } from '../interface/normalized-provider.interface';
import { CreateLocationDto } from './../../../api/location/dto/create.dto';
import { CreateSkillDto } from './../../../api/skill/dto/create.dto';
import { CreateJobDto } from './../../../api/job/dto/create.dto';
import { JobType } from './../../../database/enum/job-type.enum';
import { ProviderType } from './../../../database/enum/provider-type.enum';
import { ISecondProviderJob } from './../../../external-services/devotel/interface/second-porvider.interface';
import { formatCompensation } from './../../../tools/format-thousand';

@Injectable()
export class NormalizationService {
  public constructor() { }

  public normalizeFirstProvider(
    firstProviderJob: IFirstProviderJob,
  ): INormalizaedProviderResponse {
    const company: CreateCompanyDto = {
      industry: firstProviderJob.company?.industry,
      name: firstProviderJob.company?.name,
      website: null,
    };

    const [city, state] = firstProviderJob.details?.location?.split(',');
    const location: CreateLocationDto = {
      city: city.trim(),
      state: state.trim(),
    };

    const jobSkills: CreateSkillDto[] = firstProviderJob.skills?.map(
      (skill) => {
        return { skill } as CreateSkillDto;
      },
    );

    const providerId = firstProviderJob.jobId?.split('-').pop();
    if (!firstProviderJob.details.salaryRange) {
      throw new BadRequestException('Salary range is required')
    }
    const [minAmount, maxAmount] = firstProviderJob.details?.salaryRange
      ?.match(/\$(\d+)k/g)
      ?.map((str) => {
        const num = parseInt(str.replace(/[^\d]/g, ''), 10);
        return num * 1000;
      });

    const job: CreateJobDto = {
      postedDate: new Date(firstProviderJob.postedDate),
      jobType: JobType[firstProviderJob.details.type],
      position: firstProviderJob.title,
      providerType: ProviderType.first,
      experience: null,
      salaryRange: firstProviderJob.details.salaryRange,
      providerId,
      minAmount,
      maxAmount,
    };

    return { company: company, location, jobSkills, job };
  }

  public normalizeSecondProvider(
    providerId: string,
    secondProviderJob: ISecondProviderJob,
  ): INormalizaedProviderResponse {
    const company: CreateCompanyDto = {
      industry: null,
      name: secondProviderJob.employer?.companyName,
      website: secondProviderJob.employer.website,
    };

    const location: CreateLocationDto = {
      city: secondProviderJob.location.city,
      state: secondProviderJob.location.state,
    };

    const jobSkills: CreateSkillDto[] =
      secondProviderJob.requirements?.technologies?.map((skill) => {
        return { skill } as CreateSkillDto;
      });

    const salaryRange = formatCompensation(secondProviderJob.compensation);

    providerId = providerId.split('-').pop();
    const job: CreateJobDto = {
      postedDate: new Date(secondProviderJob.datePosted),
      jobType: JobType.Unknown,
      remote: secondProviderJob.location.remote,
      position: secondProviderJob.position,
      providerType: ProviderType.second,
      experience: secondProviderJob.requirements?.experience,
      minAmount: secondProviderJob.compensation.min,
      maxAmount: secondProviderJob.compensation.max,
      currency: secondProviderJob.compensation.currency,
      providerId,
      salaryRange,
    };

    return { company: company, location, jobSkills, job };
  }
}
