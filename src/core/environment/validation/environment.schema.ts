import * as Joi from 'joi';
import { Environment } from '../environment.type';

const productionEnvironmentSchema: Joi.StrictSchemaMap<Environment> = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8080),
  ENABLE_SWAGGER: Joi.boolean().default(true),
  PUB_SUB_PROJECT_ID: Joi.string().required(),
  PUB_SUB_TOPIC: Joi.string().required(),
  PUB_SUB_PATTERN: Joi.string().required(),
  PUB_SUB_CLIENT_EMAIL: Joi.string().email().required(),
  PUB_SUB_PRIVATE_KEY: Joi.string().required(),
  PUB_SUB_EMULATOR_HOST: Joi.string().uri().forbidden(),
  PUB_SUB_SUBSCRIPTION: Joi.string().forbidden(),
};

export const environmentSchema = Joi.object<Environment, true>({
  ...productionEnvironmentSchema,
}).when(Joi.object({ NODE_ENV: Joi.invalid('production') }).unknown(), {
  then: Joi.object<Environment, true>({
    ...productionEnvironmentSchema,
    PUB_SUB_EMULATOR_HOST: Joi.string().uri().required(),
    PUB_SUB_SUBSCRIPTION: Joi.string().required(),
    PUB_SUB_CLIENT_EMAIL: Joi.string().email().forbidden(),
    PUB_SUB_PRIVATE_KEY: Joi.string().forbidden(),
  }),
});
