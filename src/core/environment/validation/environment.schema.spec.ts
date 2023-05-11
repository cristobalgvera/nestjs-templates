import { Environment } from '../environment.type';
import { environmentSchema } from './environment.schema';

describe('EnvironmentSchema', () => {
  const commonEnvironment: Environment = {
    NODE_ENV: 'development',
    PORT: 3000,
    IS_SWAGGER_ENABLED: true,
    PUB_SUB_PROJECT_ID: 'project-id',
    PUB_SUB_TOPIC: 'topic',
    PUB_SUB_PATTERN: 'pattern',
  };

  describe.each<Environment['NODE_ENV']>(['development', 'test', 'production'])(
    'when validating common validations in %s',
    (NODE_ENV) => {
      let validEnvironment: Environment;

      beforeEach(() => {
        switch (NODE_ENV) {
          case 'development':
          case 'test':
            validEnvironment = {
              ...commonEnvironment,
              NODE_ENV,
              PUB_SUB_EMULATOR_HOST: 'http://localhost:1234',
              PUB_SUB_SUBSCRIPTION: 'subscription',
              PUB_SUB_PUSH_ENDPOINT: 'http://localhost:9876',
              PUB_SUB_CLIENT_EMAIL: undefined,
              PUB_SUB_PRIVATE_KEY: undefined,
            };
            break;
          case 'production':
            validEnvironment = {
              ...commonEnvironment,
              NODE_ENV,
              PUB_SUB_CLIENT_EMAIL: 'client@email.com',
              PUB_SUB_PRIVATE_KEY: 'private-key',
              PUB_SUB_EMULATOR_HOST: undefined,
              PUB_SUB_SUBSCRIPTION: undefined,
              PUB_SUB_PUSH_ENDPOINT: undefined,
            };
            break;
        }
      });

      describe('when environment is valid', () => {
        it.each<Partial<Environment>>([
          { PORT: undefined },
          { IS_SWAGGER_ENABLED: undefined },
        ])(
          'should properly validate if environment has %s',
          (partialEnvironment) => {
            const environment = {
              ...validEnvironment,
              ...partialEnvironment,
            } as Environment;

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
          { PUB_SUB_TOPIC: undefined },
          { PUB_SUB_TOPIC: 1234 },
          { PUB_SUB_PROJECT_ID: undefined },
          { PUB_SUB_PROJECT_ID: 1234 },
          { PUB_SUB_PATTERN: undefined },
          { PUB_SUB_PATTERN: 1234 },
        ])('should invalidate if environment has %s', (partialEnvironment) => {
          const environment = {
            ...validEnvironment,
            ...partialEnvironment,
          } as Environment;

          const validation = environmentSchema.validate(environment);

          expect(validation.error).toBeDefined();
        });
      });
    },
  );

  describe.each<Environment['NODE_ENV']>(['production'])(
    'when validating detailed validations in %s',
    () => {
      const validEnvironment: Environment = {
        ...commonEnvironment,
        NODE_ENV: 'production',
        PUB_SUB_CLIENT_EMAIL: 'client@email.com',
        PUB_SUB_PRIVATE_KEY: 'private-key',
        PUB_SUB_EMULATOR_HOST: undefined,
        PUB_SUB_SUBSCRIPTION: undefined,
        PUB_SUB_PUSH_ENDPOINT: undefined,
      };

      describe('when environment is valid', () => {
        it.each<Partial<Environment>>([{ ...validEnvironment }])(
          'should properly validate if environment has %s',
          (partialEnvironment) => {
            const environment = {
              ...validEnvironment,
              ...partialEnvironment,
            } as Environment;

            const validation = environmentSchema.validate(environment);

            expect(validation.error).toBeUndefined();
          },
        );
      });

      describe('when environment is invalid', () => {
        it.each<Partial<Record<keyof Environment, unknown>>>([
          { NODE_ENV: undefined },
          { PUB_SUB_EMULATOR_HOST: 'http://localhost:3000/invalid' },
          { PUB_SUB_SUBSCRIPTION: 'defined' },
          { PUB_SUB_PUSH_ENDPOINT: 'http://localhost:9876/defined' },
          { PUB_SUB_CLIENT_EMAIL: undefined },
          { PUB_SUB_CLIENT_EMAIL: 1234 },
          { PUB_SUB_CLIENT_EMAIL: 'not-email' },
          { PUB_SUB_PRIVATE_KEY: undefined },
          { PUB_SUB_PRIVATE_KEY: 1234 },
        ])('should invalidate if environment has %s', (partialEnvironment) => {
          const environment = {
            ...validEnvironment,
            ...partialEnvironment,
          } as Environment;

          const validation = environmentSchema.validate(environment);

          expect(validation.error).toBeDefined();
        });
      });
    },
  );

  describe.each<Environment['NODE_ENV']>(['development', 'test'])(
    'when validating detailed validations in %s',
    (NODE_ENV) => {
      const validEnvironment: Environment = {
        ...commonEnvironment,
        NODE_ENV,
        PUB_SUB_EMULATOR_HOST: 'http://localhost:1234',
        PUB_SUB_SUBSCRIPTION: 'subscription',
        PUB_SUB_PUSH_ENDPOINT: 'http://localhost:9876',
        PUB_SUB_CLIENT_EMAIL: undefined,
        PUB_SUB_PRIVATE_KEY: undefined,
      };

      describe('when environment is valid', () => {
        it.each<Partial<Environment>>([
          { ...validEnvironment },
          { NODE_ENV: undefined },
          { NODE_ENV: 'test' },
          { NODE_ENV: 'development' },
        ])(
          'should properly validate if environment has %s',
          (partialEnvironment) => {
            const environment = {
              ...validEnvironment,
              ...partialEnvironment,
            } as Environment;

            const validation = environmentSchema.validate(environment);

            expect(validation.error).toBeUndefined();
          },
        );
      });

      describe('when environment is invalid', () => {
        it.each<Partial<Record<keyof Environment, unknown>>>([
          { PUB_SUB_EMULATOR_HOST: undefined },
          { PUB_SUB_EMULATOR_HOST: 1234 },
          { PUB_SUB_EMULATOR_HOST: 'not-url' },
          { PUB_SUB_SUBSCRIPTION: undefined },
          { PUB_SUB_SUBSCRIPTION: 1234 },
          { PUB_SUB_SUBSCRIPTION: '' },
          { PUB_SUB_PUSH_ENDPOINT: undefined },
          { PUB_SUB_PUSH_ENDPOINT: 'not-url' },
          { PUB_SUB_CLIENT_EMAIL: 'defined' },
          { PUB_SUB_PRIVATE_KEY: 'defined' },
        ])('should invalidate if environment has %s', (partialEnvironment) => {
          const environment = {
            ...validEnvironment,
            ...partialEnvironment,
          } as Environment;

          const validation = environmentSchema.validate(environment);

          expect(validation.error).toBeDefined();
        });
      });
    },
  );
});
