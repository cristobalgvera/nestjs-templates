import { Environment } from '../environment.type';
import { environmentSchema } from './environment.schema';

describe('EnvironmentSchema', () => {
  const commonEnvironment: Environment = {
    NODE_ENV: 'development',
    PORT: 3000,
    ENABLE_SWAGGER: true,
    DB_NAME: 'db-name',
    DB_PASSWORD: 'db-password',
    DB_USERNAME: 'db-username',
    DB_PORT: 1234,
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
              DB_HOST: 'db-host',
              DB_SOCKET_PATH: undefined,
            };
            break;
          case 'production':
            validEnvironment = {
              ...commonEnvironment,
              NODE_ENV,
              DB_SOCKET_PATH: 'db-socket-path',
              DB_HOST: undefined,
            };
            break;
        }
      });

      describe('when environment is valid', () => {
        it.each<Partial<Environment>>([
          { PORT: undefined },
          { ENABLE_SWAGGER: undefined },
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
          { DB_PORT: undefined },
          { DB_PORT: 'invalid' },
          { DB_USERNAME: undefined },
          { DB_USERNAME: 1234 },
          { DB_USERNAME: '' },
          { DB_PASSWORD: undefined },
          { DB_PASSWORD: 1234 },
          { DB_PASSWORD: '' },
          { DB_NAME: undefined },
          { DB_NAME: 1234 },
          { DB_NAME: '' },
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
        DB_SOCKET_PATH: 'db-socket-path',
        DB_HOST: undefined,
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
          { DB_HOST: 'defined' },
          { DB_SOCKET_PATH: undefined },
          { DB_SOCKET_PATH: 1234 },
          { DB_SOCKET_PATH: '' },
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
        DB_HOST: 'db-host',
        DB_SOCKET_PATH: undefined,
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
          { DB_HOST: undefined },
          { DB_HOST: 1234 },
          { DB_HOST: '' },
          { DB_SOCKET_PATH: 'defined' },
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
