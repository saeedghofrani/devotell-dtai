import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DevotelConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get url(): string {
    return this.configService.get<string>('devotel.url');
  }

  public get prefix(): string {
    return this.configService.get<string>('devotel.prefix');
  }

  public get fullUrl(): string {
    return this.url + this.prefix;
  }
}
