import { Test, TestingModule } from '@nestjs/testing';
import { DevotelConfigService } from './devotel-config.service';
import { ConfigService } from '@nestjs/config';

describe('DevotelConfigService', () => {
  let devotelConfigService: DevotelConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'devotel.url':
            return 'http://example.com/';
          case 'devotel.prefix':
            return 'api/';
          default:
            return null;
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevotelConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    devotelConfigService =
      module.get<DevotelConfigService>(DevotelConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(devotelConfigService).toBeDefined();
  });

  it('should return the correct url', () => {
    expect(devotelConfigService.url).toBe('http://example.com/');
    expect(configService.get).toHaveBeenCalledWith('devotel.url');
  });

  it('should return the correct prefix', () => {
    expect(devotelConfigService.prefix).toBe('api/');
    expect(configService.get).toHaveBeenCalledWith('devotel.prefix');
  });

  it('should return the correct fullUrl', () => {
    expect(devotelConfigService.fullUrl).toBe('http://example.com/api/');
    expect(configService.get).toHaveBeenCalledWith('devotel.url');
    expect(configService.get).toHaveBeenCalledWith('devotel.prefix');
  });
});
