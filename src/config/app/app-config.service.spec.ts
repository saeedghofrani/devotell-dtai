import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';

describe('AppConfigService', () => {
  let appConfigService: AppConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    // Mock the ConfigService
    const mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'app.port':
            return 3000;
          case 'app.env':
            return 'development';
          case 'app.prefix':
            return '/api/v1';
          default:
            return null;
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    appConfigService = module.get<AppConfigService>(AppConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(appConfigService).toBeDefined();
  });

  it('should return the correct port', () => {
    expect(appConfigService.port).toBe(3000);
    expect(configService.get).toHaveBeenCalledWith('app.port');
  });

  it('should return the correct env', () => {
    expect(appConfigService.env).toBe('development');
    expect(configService.get).toHaveBeenCalledWith('app.env');
  });

  it('should return the correct prefix', () => {
    expect(appConfigService.prefix).toBe('/api/v1');
    expect(configService.get).toHaveBeenCalledWith('app.prefix');
  });
});
