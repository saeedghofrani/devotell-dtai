import { Provider } from "@nestjs/common";
import { DatabaseProviderConstant } from "../constant/database-provider.constant";
import { DatabaseConfigService } from "src/config/database/database-config.service";
import { DataSource } from "typeorm";

export const PostgresProvider: Provider = {
    provide: DatabaseProviderConstant,
    inject: [DatabaseConfigService],
    useFactory: async (config: DatabaseConfigService) => {
        const postgresDataSource = new DataSource({
            type: "postgres",
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.username,
            password: config.password,
            entities: ['dist/**/*.entity.js', '**/*.entity.js'],
            synchronize: false,
        });
        await postgresDataSource.initialize();
        return postgresDataSource;
    }
};