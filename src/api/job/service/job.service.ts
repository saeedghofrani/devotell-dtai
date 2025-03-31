import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult } from 'typeorm';
import { CreateJobDto } from '../dto/create.dto';
import { JobRepository } from '../repository/job.repository';
import { CompanyService } from '../../company/service/company.service';
import { LocationService } from 'src/api/location/service/location.service';
import { SkillService } from '../../skill/service/skill.service';
import { JobEntity } from 'src/database/entities/job.entity';

@Injectable()
export class JobService {
  public constructor(
    private readonly jobRepository: JobRepository,
    private companyService: CompanyService,
    private locationService: LocationService,
    private skillService: SkillService,
  ) {}

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
}
