import { Test, TestingModule } from '@nestjs/testing';
import { CronConfigService } from './cron-config.service';
import { ConfigService } from '@nestjs/config';

describe('CronConfigService', () => {
    let cronConfigService: CronConfigService;
    let configService: ConfigService;

    beforeEach(async () => {
        // Mock the ConfigService
        const mockConfigService = {
            get: jest.fn().mockImplementation((key: string) => {
                switch (key) {
                    case 'cron.firstProvider':
                        return 'Provider1';
                    case 'cron.secondProvider':
                        return 'Provider2';
                    default:
                        return null;
                }
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CronConfigService,
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
            ],
        }).compile();

        cronConfigService = module.get<CronConfigService>(CronConfigService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(cronConfigService).toBeDefined();
    });

    it('should return the correct firstProvider', () => {
        expect(cronConfigService.firstProvider).toBe('Provider1');
        expect(configService.get).toHaveBeenCalledWith('cron.firstProvider');
    });

    it('should return the correct secondProvider', () => {
        expect(cronConfigService.secondProvider).toBe('Provider2');
        expect(configService.get).toHaveBeenCalledWith('cron.secondProvider');
    });
});
