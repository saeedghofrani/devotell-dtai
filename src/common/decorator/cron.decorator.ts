import { applyDecorators } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

export function CronWithEnv(envVar: string, defaultExpression = '0 * * * *') {
    return applyDecorators(
        Cron(process.env[envVar] || defaultExpression)
    );
}