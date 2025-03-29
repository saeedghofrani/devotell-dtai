import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { CompanyEntity } from './company.entity';
import { JobSkillEntity } from './job-skill.entity';
import { LocationEntity } from './location.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends MainEntity {
    @Column({ type: 'varchar', length: 50, unique: true })
    providerId: string;

    @Column({ type: 'enum', enum: ['first', 'second'], default: 'first' })
    providerType: 'first' | 'second';

    @Column({ type: 'enum', enum: ['full-time', 'part-time', 'contract', 'remote', 'unknown'], default: 'unknown' })
    jobType: 'full-time' | 'part-time' | 'contract' | 'remote' | 'unknown';

    @Column({ type: 'int', default: 0 })
    experience: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    position: string;

    @Column({ type: 'timestamptz' })
    postedDate: Date;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    minAmount: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    maxAmount: number;

    @Column({ type: 'varchar', length: 3, default: 'USD' })
    currency: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    salaryRange: string;

    @ManyToOne(() => CompanyEntity, company => company.jobs)
    companies: CompanyEntity;

    @ManyToOne(() => LocationEntity, location => location.jobs)
    location: LocationEntity;

    @ManyToMany(() => JobSkillEntity, jobSkill => jobSkill.jobs)
    @JoinTable()
    skills: JobSkillEntity[];
}