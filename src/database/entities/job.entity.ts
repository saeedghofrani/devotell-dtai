import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { CompanyEntity } from './company.entity';
import { JobSkillEntity } from './job-skill.entity';
import { LocationEntity } from './location.entity';
import { ProviderType } from '../enum/provider-type.enum';
import { JobType } from '../enum/job-type.enum';

@Entity({ name: 'jobs' })
export class JobEntity extends MainEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  providerId: string;

  @Column({ type: 'enum', enum: ProviderType, default: ProviderType.first })
  providerType: ProviderType;

  @Column({ type: 'enum', enum: JobType, default: JobType.Unknown })
  jobType: JobType;

  @Column({ type: 'int', default: 0 })
  experience: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position: string;

  @Column({ type: 'timestamptz' })
  postedDate: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
  minAmount: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
  maxAmount: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'boolean', default: false })
  remote: boolean;

  @Column({ type: 'varchar', length: 100, nullable: false })
  salaryRange: string;

  @ManyToOne(() => CompanyEntity, (company) => company.jobs, { onDelete: 'CASCADE' })
  company: CompanyEntity;

  @ManyToOne(() => LocationEntity, (location) => location.jobs)
  location: LocationEntity;

  @ManyToMany(() => JobSkillEntity, (jobSkill) => jobSkill.jobs)
  @JoinTable({ name: '_JobToJobSkill' })
  skills: JobSkillEntity[];
}
