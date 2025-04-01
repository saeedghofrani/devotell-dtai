import { Global, Module } from '@nestjs/common';
import { ConfigurationModule } from './../config/config.module';
import { PostgresProvider } from './provider/postgres.provider';
import { DataSource, EntityManager } from 'typeorm';
import { DatabaseProviderConstant } from './constant/database-provider.constant';

@Global()
@Module({
    imports: [ConfigurationModule],
    providers: [
        PostgresProvider,
        {
            provide: EntityManager,
            useFactory: (dataSource: DataSource) => dataSource.manager,
            inject: [DatabaseProviderConstant],
        },
    ],
    exports: [
        PostgresProvider,
        {
            provide: EntityManager,
            useFactory: (dataSource: DataSource) => dataSource.manager,
            inject: [DatabaseProviderConstant],
        },
    ],
})
export class DatabaseModule { }