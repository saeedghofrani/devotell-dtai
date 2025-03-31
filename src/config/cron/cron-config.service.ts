import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get firstProvider(): string {
    return this.configService.get<string>('cron.firstProvider');
  }

  public get secondProvider(): string {
    return this.configService.get<string>('cron.secondProvider');
  }
}
