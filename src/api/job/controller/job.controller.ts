import { Controller, Get, Query } from '@nestjs/common';
import { PageDto } from './../../../common/pagination/page.dto';
import { JobEntity } from './../../../database/entities/job.entity';
import { JobFilterDto } from '../dto/filter.dto';
import { JobService } from '../service/job.service';

@Controller('job-offers')
export class JobController {
    public constructor(private readonly jobService: JobService) { }

    @Get()
    public async createEntity(
        @Query() filterDto: JobFilterDto
    ): Promise<PageDto<JobEntity>> {
        return await this.jobService.pagination(filterDto);
    }
}
