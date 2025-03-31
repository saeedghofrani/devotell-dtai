import { Inject, Injectable } from '@nestjs/common';
import { DatabaseProviderConstant } from 'src/database/constant/database-provider.constant';
import { JobEntity } from 'src/database/entities/job.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateJobDto } from '../dto/create.dto';

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
}