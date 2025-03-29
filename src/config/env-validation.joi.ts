import * as joi from 'joi';

export const envValidationSchema = joi.object({
  // APP
  NODE_ENV: joi.string().required(),
  APP_PORT: joi.number().required(),
  APP_API_PREFIX: joi.string().required(),

  //DEVOTEL
  DEVOTEL_URL: joi.string().required(),
  DEVOTEL_PREFIX: joi.string().required(),
});
