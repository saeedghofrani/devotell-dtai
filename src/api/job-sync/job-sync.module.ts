import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DevotelModule } from './../../external-services/devotel/devotel.module';
import { CompanyModule } from '../company/company.module';
import { JobModule } from '../job/job.module';
import { LocationModule } from '../location/location.module';
import { NormalizationModule } from '../normalization/normalization.module';
import { SkillModule } from '../skill/skill.module';
import { JobSyncService } from './service/job-sync.service';

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
