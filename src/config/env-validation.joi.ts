import * as joi from 'joi';

export const envValidationSchema = joi.object({
  // APP
  NODE_ENV: joi.string().required(),
  APP_PORT: joi.number().required(),
  APP_API_PREFIX: joi.string().required(),

  //DEVOTEL
  DEVOTEL_URL: joi.string().required(),
  DEVOTEL_PREFIX: joi.string().required(),

  //DB
  DB_HOST: joi.string().required(),
  DB_PORT: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),

  //CRON
  PROVIDER1_CRON_SCHEDULE: joi.string().required(),
  PROVIDER2_CRON_SCHEDULE: joi.string().required(),
});
