import { Environment } from '../environment.type';
import { environmentSchema } from './environment.schema';

describe('EnvironmentSchema', () => {
  const validEnvironment: Environment = {
    NODE_ENV: 'development',
    PORT: 3000,
    IS_SWAGGER_ENABLED: true,
    IP_WHITELIST_EXAMPLE: ['127.0.0.1'],
  };

  describe('when environment is valid', () => {
    it.each<Partial<Environment>>([
      { ...validEnvironment },
      { NODE_ENV: 'production' },
      { NODE_ENV: 'test' },
      { NODE_ENV: undefined },
      { PORT: undefined },
      { IS_SWAGGER_ENABLED: undefined },
      { IS_SWAGGER_ENABLED: false },
      { IP_WHITELIST_EXAMPLE: [] },
      {
        IP_WHITELIST_EXAMPLE: [
          ...validEnvironment.IP_WHITELIST_EXAMPLE,
          '10.0.0.2',
        ],
      },
    ])(
      'should properly validate if environment has %s',
      (partialEnvironment) => {
        const environment = {
          ...validEnvironment,
          ...partialEnvironment,
        };

        const validation = environmentSchema.validate(environment);

        expect(validation.error).toBeUndefined();
      },
    );
  });

  describe('when environment is invalid', () => {
    it.each<Partial<Record<keyof Environment, unknown>>>([
      { NODE_ENV: 'invalid' },
      { PORT: 'invalid' },
      { IS_SWAGGER_ENABLED: 'invalid' },
      { IP_WHITELIST_EXAMPLE: undefined },
      { IP_WHITELIST_EXAMPLE: ['invalid-ip'] },
      {
        IP_WHITELIST_EXAMPLE: [
          ...validEnvironment.IP_WHITELIST_EXAMPLE,
          'invalid-ip',
        ],
      },
    ])('should invalidate if environment has %s', (partialEnvironment) => {
      const environment = {
        ...validEnvironment,
        ...partialEnvironment,
      };

      const validation = environmentSchema.validate(environment);

      expect(validation.error).toBeDefined();
    });
  });
});
