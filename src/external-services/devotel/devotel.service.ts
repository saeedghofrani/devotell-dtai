import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DevotelConfigService } from '../../config/devotel/devotel-config.service';
import { RequestService } from '../request/request.service';
import { ISecondProvider } from './interface/second-porvider.interface';
import { IFirstProvider } from './interface/first-provider.interface';

@Injectable()
export class DevotelService implements OnApplicationBootstrap {
  private provider1Url: string;
  private provider2Url: string;

  public constructor(
    private readonly requestService: RequestService,
    private readonly devotelConfigService: DevotelConfigService,
  ) {}

  public onApplicationBootstrap(): void {
    this.provider1Url = `${this.devotelConfigService.fullUrl}provider1/jobs`;
    this.provider2Url = `${this.devotelConfigService.fullUrl}provider2/jobs`;
  }

  public async fetchFirstProviderJobs(): Promise<IFirstProvider> {
    return this.requestService.get<IFirstProvider>(this.provider1Url);
  }

  public async fetchSecondProviderJobs(): Promise<ISecondProvider> {
    return this.requestService.get<ISecondProvider>(this.provider2Url);
  }
}
