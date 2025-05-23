import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { MainEntity } from './../../common/entities/main.entity';
import { JobEntity } from './job.entity';

@Entity({ name: 'job_skills' })
export class JobSkillEntity extends MainEntity {
  @Index()
  @Column({ type: 'varchar', length: 150, unique: true })
  skill: string;

  @ManyToMany(() => JobEntity, (jobs) => jobs.skills)
  jobs: JobEntity[];
}
