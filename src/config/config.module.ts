import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app/app-config.service';
import { envValidationSchema } from './env-validation.joi';
import { DevotelConfigService } from './devotel/devotel-config.service';
import appConfig from './app/app-config';
import devotelConfig from './devotel/devotel-config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, devotelConfig],
      validationSchema: envValidationSchema,
    }),
  ],
  providers: [AppConfigService, DevotelConfigService],
  exports: [AppConfigService, DevotelConfigService],
})
export class ConfigurationModule {}
