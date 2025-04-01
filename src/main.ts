import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-handlers/catch.handler';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  configureApp(app, appConfigService);
  await startApp(app, appConfigService);
}

function configureApp(
  app: Readonly<INestApplication>,
  appConfigService: Readonly<AppConfigService>,
): void {
  app.setGlobalPrefix(appConfigService.prefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      stopAtFirstError: false,
      whitelist: true,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
          imgSrc: [`'self'`],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
}

async function startApp(
  app: Readonly<INestApplication>,
  appConfigService: Readonly<AppConfigService>,
): Promise<void> {
  await app.listen(appConfigService.port);
  Logger.log(
    `Application is running on ${appConfigService.env} envirenment`,
    'Bootstrap',
  );
  Logger.log(
    `Server: http://127.0.0.1:${appConfigService.port}/${appConfigService.prefix}/v1/`,
    'Bootstrap',
  );
}

bootstrap()
  .then()
  .catch((error) => {
    Logger.error(error, 'Error starting the application');
    process.exit(1);
  });
