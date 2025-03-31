import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { JobModule } from './api/job/job.module';
import { JobSyncModule } from './api/job-sync/job-sync.module';
import { CompanyModule } from './api/company/company.module';
import { LocationModule } from './api/location/location.module';
import { SkillModule } from './api/skill/skill.module';
import { NormalizationModule } from './api/normalization/normalization.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    JobModule,
    JobSyncModule,
    CompanyModule,
    LocationModule,
    SkillModule,
    NormalizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
