import { MainEntity } from './../../common/entities/main.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends MainEntity {
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    industry: string;

    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    website: string;

    @OneToMany(() => JobEntity, job => job.companies)
    jobs: JobEntity[];
}