import { MainEntity } from './../../common/entities/main.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends MainEntity {
  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  industry: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @OneToMany(() => JobEntity, (job) => job.company)
  jobs: JobEntity[];
}
