import { plainToInstance } from 'class-transformer';
import { environmentSchema } from './environment.schema';
import { Environment } from '../environment.type';

export function validateEnvironment(
  configuration: Record<string, unknown>,
): Environment {
  const classConfig = plainToInstance(Environment, configuration);

  const validation = environmentSchema.validate(classConfig, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (validation.error) throw new Error(validation.error.message);

  return validation.value;
}
