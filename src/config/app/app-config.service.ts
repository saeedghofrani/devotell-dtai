import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  public get env(): string {
    return this.configService.get<string>('app.env');
  }

  public get prefix(): string {
    return this.configService.get<string>('app.prefix');
  }
}
