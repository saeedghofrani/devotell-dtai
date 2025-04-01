import { Inject, Injectable } from '@nestjs/common';
import { JobEntity } from './../../../database/entities/job.entity';
import { DataSource, EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateJobDto } from '../dto/create.dto';
import { JobFilterDto } from '../dto/filter.dto';
import { DatabaseProviderConstant } from './../../../database/constant/database-provider.constant';

@Injectable()
export class JobRepository extends Repository<JobEntity> {
  constructor(
    @Inject(DatabaseProviderConstant) private postgresDataSource: DataSource,
  ) {
    super(JobEntity, postgresDataSource.createEntityManager());
  }

  public async upsertJob(
    createJob: CreateJobDto,
    entityManager?: EntityManager,
  ): Promise<JobEntity> {
    const repository = entityManager?.getRepository(JobEntity) || this;

    const existingJob = await repository.findOne({
      where: { providerId: createJob.providerId },
      relations: ['skills']
    });

    let job: JobEntity;

    if (!createJob.experience) createJob.experience = 0;
    if (existingJob) {
      repository.merge(existingJob, {
        ...createJob,
        id: existingJob.id,
        skills: createJob.skills
      });
      job = existingJob;
    } else
      job = repository.create(createJob);

    return await repository.save(job);
  }

  public buildQuery(filterDto: JobFilterDto): SelectQueryBuilder<JobEntity> {
    const query = this.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.location', 'location')
      .leftJoinAndSelect('job.skills', 'skills')
      .select([
        'job.id',
        'company.id',
        'location.id',
        'skills.id',
        'job.providerId',
        'job.jobType',
        'job.experience',
        'job.minAmount',
        'job.maxAmount',
        'job.position',
        'job.salaryRange',
        'job.remote',
        'company.name',
        'location.city',
        'location.state',
        'skills.skill',
      ]);

    if (filterDto.position) {
      query.andWhere('job.position ILIKE :position', {
        position: `%${filterDto.position}%`
      });
    }

    if (filterDto.location) {
      query.andWhere('(location.city ILIKE :location OR location.state ILIKE :location)', {
        location: `%${filterDto.location}%`
      });
    }

    if (filterDto.minSalary) {
      query.andWhere('job.minAmount >= :minSalary', {
        minSalary: filterDto.minSalary
      });
    }

    if (filterDto.maxSalary) {
      query.andWhere('job.maxAmount <= :maxSalary', {
        maxSalary: filterDto.maxSalary
      });
    }

    if (filterDto.jobType) {
      query.andWhere('job.jobType = :jobType', {
        jobType: filterDto.jobType
      });
    }

    if (filterDto.skill) {
      query.andWhere('skills.skill ILIKE :skill', {
        skill: `%${filterDto.skill}%`
      });
    }

    return query;
  }
}
