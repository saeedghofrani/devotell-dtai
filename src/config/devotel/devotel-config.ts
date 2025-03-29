import { registerAs } from '@nestjs/config';

export default registerAs('devotel', () => ({
  url: process.env.DEVOTEL_URL,
  prefix: process.env.DEVOTEL_PREFIX,
}));
