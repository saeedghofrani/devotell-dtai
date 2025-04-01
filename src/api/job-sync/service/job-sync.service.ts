import { Injectable, Logger } from '@nestjs/common';
import { CompanyService } from './../../../api/company/service/company.service';
import { JobService } from './../../../api/job/service/job.service';
import { LocationService } from './../../../api/location/service/location.service';
import { NormalizationService } from './../../../api/normalization/service/normalization.service';
import { SkillService } from './../../../api/skill/service/skill.service';
import { CronWithEnv } from './../../../common/decorator/cron.decorator';
import { DevotelService } from './../../../external-services/devotel/devotel.service';
import { IFirstProvider } from './../../../external-services/devotel/interface/first-provider.interface';
import { ISecondProvider } from './../../../external-services/devotel/interface/second-porvider.interface';
import { EntityManager } from 'typeorm';
@Injectable()
export class JobSyncService {
  private readonly logger = new Logger(JobSyncService.name);

  constructor(
    private readonly entityManager: EntityManager,
    private readonly devotelService: DevotelService,
    private readonly normalizationService: NormalizationService,
    private readonly jobService: JobService,
    private readonly companyService: CompanyService,
    private readonly locationService: LocationService,
    private readonly skillService: SkillService,
  ) { }

  public async syncFirstProviderJobs(provider: IFirstProvider): Promise<void> {
    await Promise.all(
      provider.jobs.map(async (job) => {
        await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            try {
              const normalizedJob =
                this.normalizationService.normalizeFirstProvider(job);

              const companyResult = await this.companyService.upsertCompany(
                normalizedJob.company,
                transactionalEntityManager,
              );
              const companyId: number = companyResult.identifiers[0]?.id;
              if (!companyId) throw new Error('Failed to get company ID');

              const locationResult = await this.locationService.upsertLocation(
                normalizedJob.location,
                transactionalEntityManager,
              );

              const locationId: number = locationResult.identifiers[0]?.id;
              if (!locationId) throw new Error('Failed to get location ID');

              const skillsResult = await this.skillService.upsertManySkill(
                normalizedJob.jobSkills,
                transactionalEntityManager,
              );
              const skillIds: number[] = skillsResult.identifiers.map(
                (idObj) => idObj.id,
              );

              normalizedJob.job.companyId = companyId;
              normalizedJob.job.locationId = locationId;
              normalizedJob.job.skillIds = skillIds;

              await this.jobService.upsertJob(
                normalizedJob.job,
                transactionalEntityManager,
              );
            } catch (error) {
              throw error;
            }
          },
        );
      }),
    );
  }

  public async syncSecondProviderJobs(
    provider: ISecondProvider,
  ): Promise<void> {
    const jobs = Object.entries(provider.data.jobsList);
    await Promise.all(
      jobs.map(async ([jobId, job]) => {
        await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            try {
              const normalizedJob =
                this.normalizationService.normalizeSecondProvider(jobId, job);

              const companyResult = await this.companyService.upsertCompany(
                normalizedJob.company,
                transactionalEntityManager,
              );
              const companyId = companyResult.identifiers[0]?.id;
              if (!companyId) throw new Error('Failed to get company ID');

              const locationResult = await this.locationService.upsertLocation(
                normalizedJob.location,
                transactionalEntityManager,
              );
              const locationId = locationResult.identifiers[0]?.id;
              if (!locationId) throw new Error('Failed to get location ID');

              const skillsResult = await this.skillService.upsertManySkill(
                normalizedJob.jobSkills,
                transactionalEntityManager,
              );
              const skillIds = skillsResult.identifiers.map(
                (idObj) => idObj.id,
              );

              normalizedJob.job.companyId = companyId;
              normalizedJob.job.locationId = locationId;
              normalizedJob.job.skillIds = skillIds;
              normalizedJob.job.remote;
              await this.jobService.upsertJob(
                normalizedJob.job,
                transactionalEntityManager,
              );
            } catch (error) {
              throw error;
            }
          },
        );
      }),
    );
  }

  @CronWithEnv('PROVIDER1_CRON_SCHEDULE')
  private async handleProvider1Cron() {
    this.logger.log('Running First Provider sync cron job');
    const provider: IFirstProvider =
      await this.devotelService.fetchFirstProviderJobs();
    await this.syncFirstProviderJobs(provider);
  }

  @CronWithEnv('PROVIDER2_CRON_SCHEDULE')
  private async handleProvider2Cron() {
    this.logger.log('Running Second Provider sync cron job');
    const provider = await this.devotelService.fetchSecondProviderJobs();
    await this.syncSecondProviderJobs(provider);
  }
}