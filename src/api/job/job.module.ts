import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DevotelModule } from 'src/external-services/devotel/devotel.module';
import { JobRepository } from './repository/job.repository';
import { JobService } from './service/job.service';
import { CompanyModule } from '../company/company.module';
import { LocationModule } from '../location/location.module';
import { SkillModule } from '../skill/skill.module';
import { JobController } from './controller/job.controller';

@Module({
  imports: [CompanyModule, LocationModule, SkillModule],
  controllers: [JobController],
  providers: [JobRepository, JobService],
  exports: [JobRepository, JobService],
})
export class JobModule {}
