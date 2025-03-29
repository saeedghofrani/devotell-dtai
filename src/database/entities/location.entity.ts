import { MainEntity } from './../../common/entities/main.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity({ name: 'locations' })
@Unique(["city", "state", "country"])
export class LocationEntity extends MainEntity {
    @Column({ type: 'varchar', length: 100, nullable: true })
    city: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    state: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    country: string;

    @OneToMany(() => JobEntity, jobs => jobs.location)
    jobs: JobEntity[];
}