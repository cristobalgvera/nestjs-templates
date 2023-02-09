import { Environment } from '../environment.type';
import { environmentSchema } from './environment.schema';

describe('EnvironmentSchema', () => {
  const validEnvironment: Environment = {
    NODE_ENV: 'development',
    PORT: 3000,
    ENABLE_SWAGGER: true,
    IP_WHITELIST_EXAMPLE: ['127.0.0.1'],
  };

  it.each([
    { ...validEnvironment },
    { ...validEnvironment, NODE_ENV: 'production' },
    { ...validEnvironment, NODE_ENV: 'test' },
    { ...validEnvironment, NODE_ENV: undefined },
    { ...validEnvironment, PORT: undefined },
    { ...validEnvironment, ENABLE_SWAGGER: undefined },
    { ...validEnvironment, ENABLE_SWAGGER: false },
    { ...validEnvironment, IP_WHITELIST: [] },
    {
      ...validEnvironment,
      IP_WHITELIST_EXAMPLE: [
        ...validEnvironment.IP_WHITELIST_EXAMPLE,
        '10.0.0.2',
      ],
    },
  ])('should properly validate %s', () => {
    const validation = environmentSchema.validate(validEnvironment);

    expect(validation.error).toBeUndefined();
    expect(validation.value).toEqual(validEnvironment);
  });

  it.each([
    { ...validEnvironment, NODE_ENV: 'invalid' },
    { ...validEnvironment, PORT: 'invalid' },
    { ...validEnvironment, ENABLE_SWAGGER: 'invalid' },
    { ...validEnvironment, IP_WHITELIST_EXAMPLE: undefined },
    { ...validEnvironment, IP_WHITELIST_EXAMPLE: ['invalid-ip'] },
    {
      ...validEnvironment,
      IP_WHITELIST_EXAMPLE: [
        ...validEnvironment.IP_WHITELIST_EXAMPLE,
        'invalid-ip',
      ],
    },
    { ...validEnvironment, PUB_SUB_PROJECT_ID: undefined },
    { ...validEnvironment, PUB_SUB_PROJECT_ID: 1234 },
    { ...validEnvironment, PUB_SUB_API_ENDPOINT: undefined },
    { ...validEnvironment, PUB_SUB_API_ENDPOINT: 'invalid-endpoint' },
    { ...validEnvironment, PUB_SUB_TOPIC: undefined },
    { ...validEnvironment, PUB_SUB_TOPIC: 123 },
    { ...validEnvironment, PUB_SUB_PATTERN: undefined },
    { ...validEnvironment, PUB_SUB_PATTERN: 123 },
    {},
  ])('should invalidate %s', (invalidValue) => {
    const validation = environmentSchema.validate(invalidValue);

    expect(validation.error).toBeDefined();
  });
});
