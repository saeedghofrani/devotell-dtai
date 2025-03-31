import { registerAs } from '@nestjs/config';

export default registerAs('cron', () => ({
  firstProvider: process.env.PROVIDER1_CRON_SCHEDULE,
  secondProvider: process.env.PROVIDER2_CRON_SCHEDULE,
}));
