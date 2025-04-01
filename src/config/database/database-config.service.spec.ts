import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database-config.service';

describe('DatabaseConfigService', () => {
    let configService: ConfigService;
    let service: DatabaseConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
        DatabaseConfigService['instance'] = undefined; // Reset singleton before each test
    });

    describe('getInstance()', () => {
        it('should throw error if no ConfigService provided on first initialization', () => {
            expect(() => DatabaseConfigService.getInstance()).toThrow(
                'First initialization requires ConfigService',
            );
        });

        it('should create instance when ConfigService is provided', () => {
            const instance = DatabaseConfigService.getInstance(configService);
            expect(instance).toBeInstanceOf(DatabaseConfigService);
        });

        it('should return same instance on subsequent calls', () => {
            const instance1 = DatabaseConfigService.getInstance(configService);
            const instance2 = DatabaseConfigService.getInstance();
            expect(instance1).toBe(instance2);
        });
    });

    describe('configuration properties', () => {
        beforeEach(() => {
            jest.spyOn(configService, 'get').mockImplementation((key: string) => {
                const mockConfig = {
                    'database.host': 'localhost',
                    'database.port': '5432',
                    'database.username': 'testuser',
                    'database.password': 'testpass',
                    'database.database': 'testdb',
                };
                return mockConfig[key];
            });

            service = DatabaseConfigService.getInstance(configService);
        });

        it('should return host', () => {
            expect(service.host).toBe('localhost');
            expect(configService.get).toHaveBeenCalledWith('database.host');
        });

        it('should return port as number', () => {
            expect(service.port).toBe(5432);
            expect(configService.get).toHaveBeenCalledWith('database.port');
        });

        it('should return username', () => {
            expect(service.username).toBe('testuser');
            expect(configService.get).toHaveBeenCalledWith('database.username');
        });

        it('should return password', () => {
            expect(service.password).toBe('testpass');
            expect(configService.get).toHaveBeenCalledWith('database.password');
        });

        it('should return database name', () => {
            expect(service.database).toBe('testdb');
            expect(configService.get).toHaveBeenCalledWith('database.database');
        });
    });

    describe('error cases', () => {

        it('should handle empty port number', () => {
            jest.spyOn(configService, 'get').mockImplementation((key: string) =>
                key === 'database.port' ? '' : 'value'
            );
            service = DatabaseConfigService.getInstance(configService);

            expect(service.port).toBe(0);
        });
    });
});