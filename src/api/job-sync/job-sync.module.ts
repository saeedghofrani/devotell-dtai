import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DevotelModule } from 'src/external-services/devotel/devotel.module';
import { JobModule } from '../job/job.module';
import { JobSyncService } from './service/job-sync.service';
import { CompanyModule } from '../company/company.module';
import { LocationModule } from '../location/location.module';
import { SkillModule } from '../skill/skill.module';
import { NormalizationModule } from '../normalization/normalization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { DatabaseProviderConstant } from 'src/database/constant/database-provider.constant';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DevotelModule,
    JobModule,
    CompanyModule,
    LocationModule,
    SkillModule,
    NormalizationModule,
  ],
  providers: [JobSyncService],
})
export class JobSyncModule {}
