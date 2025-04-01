import { Inject, Injectable } from '@nestjs/common';
import { DatabaseProviderConstant } from './../../../database/constant/database-provider.constant';
import { JobSkillEntity } from './../../../database/entities/job-skill.entity';
import {
  DataSource,
  EntityManager,
  In,
  InsertResult,
  Repository,
} from 'typeorm';
import { CreateSkillDto } from '../dto/create.dto';

@Injectable()
export class SkillRepository extends Repository<JobSkillEntity> {
  constructor(
    @Inject(DatabaseProviderConstant) private postgresDataSource: DataSource,
  ) {
    super(JobSkillEntity, postgresDataSource.createEntityManager());
  }

  public async upsertSkill(createSkill: CreateSkillDto): Promise<InsertResult> {
    return await this.upsert(
      {
        skill: createSkill.skill,
      },
      { conflictPaths: { skill: true } },
    );
  }

  public async upsertManySkill(
    createSkills: CreateSkillDto[],
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    const repository = entityManager?.getRepository(JobSkillEntity) || this;
    return await repository.upsert(createSkills, {
      conflictPaths: { skill: true }
    });
  }

  public async findManySkill(
    ids: number[],
    entityManager?: EntityManager,
  ): Promise<JobSkillEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const repository = entityManager?.getRepository(JobSkillEntity) || this;
    return await repository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
