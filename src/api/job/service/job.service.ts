import { Injectable } from '@nestjs/common';
import { LocationService } from 'src/api/location/service/location.service';
import { PageDto } from 'src/common/pagination/page.dto';
import { createPagination } from 'src/common/pagination/pagination';
import { JobEntity } from 'src/database/entities/job.entity';
import { EntityManager } from 'typeorm';
import { CompanyService } from '../../company/service/company.service';
import { SkillService } from '../../skill/service/skill.service';
import { CreateJobDto } from '../dto/create.dto';
import { JobFilterDto } from '../dto/filter.dto';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class JobService {
  public constructor(
    private readonly jobRepository: JobRepository,
    private companyService: CompanyService,
    private locationService: LocationService,
    private skillService: SkillService,
  ) { }

  public async upsertJob(
    createJob: CreateJobDto,
    entityManager?: EntityManager,
  ): Promise<JobEntity> {
    if (createJob.companyId)
      createJob.company = await this.companyService.findByIdCompany(
        createJob.companyId,
        entityManager,
      );

    if (createJob.locationId)
      createJob.location = await this.locationService.findByIdLocation(
        createJob.locationId,
        entityManager,
      );

    if (createJob.skillIds)
      createJob.skills = await this.skillService.findManySkill(
        createJob.skillIds,
        entityManager,
      );

    return await this.jobRepository.upsertJob(createJob, entityManager);
  }

  public async pagination(filterDto: JobFilterDto): Promise<PageDto<JobEntity>> {
    const query = this.jobRepository.buildQuery(filterDto);
    return createPagination(query, filterDto.page, filterDto.limit);
  }
}