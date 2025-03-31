import { Injectable } from '@nestjs/common';
import { EntityManager, InsertResult } from 'typeorm';
import { CreateSkillDto } from '../dto/create.dto';
import { SkillRepository } from '../repository/skill.repository';
import { JobSkillEntity } from 'src/database/entities/job-skill.entity';

@Injectable()
export class SkillService {
  public constructor(private readonly skillRepository: SkillRepository) {}

  public async upsertSkill(createSkill: CreateSkillDto): Promise<InsertResult> {
    return await this.skillRepository.upsertSkill(createSkill);
  }

  public async upsertManySkill(
    createSkills: CreateSkillDto[],
    entityManager?: EntityManager,
  ): Promise<InsertResult> {
    return await this.skillRepository.upsertManySkill(
      createSkills,
      entityManager,
    );
  }

  public async findManySkill(
    ids: number[],
    entityManager?: EntityManager,
  ): Promise<JobSkillEntity[]> {
    return await this.skillRepository.findManySkill(ids, entityManager);
  }
}
