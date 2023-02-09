import * as Joi from 'joi';
import { Environment } from '../environment.type';

export const environmentSchema = Joi.object<Environment, true>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8080),
  ENABLE_SWAGGER: Joi.boolean().default(true),

  /**
   * You can validate any object or array following Joi validation.
   * You can also make usage of multiple Joi validation schemas
   * in order to facilitate testing.
   */
  IP_WHITELIST_EXAMPLE: Joi.array().items(Joi.string().ip()).required(),
});
