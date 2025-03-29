import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get host(): string {
    return this.configService.get<string>('database.host') as string;
  }

  public get port(): number {
    return Number(this.configService.get<string>('database.port') as string);
  }

  public get username(): string {
    return this.configService.get<string>('database.username') as string;
  }

  public get password(): string {
    return this.configService.get<string>('database.password') as string;
  }

  public get database(): string {
    return this.configService.get<string>('database.database') as string;
  }
}
