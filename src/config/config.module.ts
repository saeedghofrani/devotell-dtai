import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app-config';
import { AppConfigService } from './app/app-config.service';
import databaseConfig from './database/database-config';
import { DatabaseConfigService } from './database/database-config.service';
import devotelConfig from './devotel/devotel-config';
import { DevotelConfigService } from './devotel/devotel-config.service';
import { envValidationSchema } from './env-validation.joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, devotelConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
  ],
  providers: [AppConfigService, DevotelConfigService, DatabaseConfigService],
  exports: [AppConfigService, DevotelConfigService, DatabaseConfigService],
})
export class ConfigurationModule {}
