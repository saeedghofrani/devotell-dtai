import { Global, Module } from "@nestjs/common";
import { ConfigurationModule } from "src/config/config.module";
import { PostgresProvider } from "./provider/postgres.provider";

@Global()
@Module({
    imports: [ConfigurationModule],
    providers: [PostgresProvider],
    exports: [PostgresProvider]
})
export class DatabaseModule { }