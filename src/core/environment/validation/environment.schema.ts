import * as Joi from 'joi';
import { Environment } from '../environment.type';

const productionEnvironmentSchema: Joi.StrictSchemaMap<Environment> = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8080),
  IS_SWAGGER_ENABLED: Joi.boolean().default(true),
  DB_HOST: Joi.string().forbidden(),
  DB_PORT: Joi.number().port().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SOCKET_PATH: Joi.string().required(),
};

export const environmentSchema = Joi.object<Environment, true>({
  ...productionEnvironmentSchema,
}).when(Joi.object({ NODE_ENV: Joi.invalid('production') }).unknown(), {
  then: Joi.object<Environment, true>({
    ...productionEnvironmentSchema,
    DB_SOCKET_PATH: Joi.string().forbidden(),
    DB_HOST: Joi.string().required(),
  }),
});
