import { Environment, EnvironmentService } from '@core/environment';
import { createMock } from '@golevelup/ts-jest';
import { Redis, RedisOptions } from 'ioredis';
import { RedisProvider, REDIS_CLIENT } from './redis.provider';

jest.mock('ioredis', () => ({
  Redis: jest.fn(),
}));

const redisMock = jest.mocked(Redis);

describe('RedisProvider', () => {
  describe('provide', () => {
    let actual: ReturnType<(typeof RedisProvider)['provide']>;

    beforeEach(() => {
      actual = RedisProvider.provide();
    });

    describe('token', () => {
      it('should use the correct injection token', () => {
        const expected = REDIS_CLIENT;

        expect(actual.provide).toEqual(expected);
      });
    });

    describe('inject', () => {
      it('should contain the EnvironmentService', () => {
        const expected = EnvironmentService;

        expect(actual.inject).toContain(expected);
      });
    });

    describe('useFactory', () => {
      const environment = {
        REDISHOST: 'redis_host',
        REDISAUTH: 'redis_auth',
        REDISPORT: 1234,
      } as Environment;

      let environmentService: EnvironmentService;

      beforeEach(() => {
        environmentService = createMock<EnvironmentService>({
          getEnvironmentValue: (key) => environment[key],
        });

        actual.useFactory(environmentService);
      });

      describe('when instantiate the redis client', () => {
        it('should instantiate a single redis client', () => {
          expect(redisMock).toHaveBeenCalledTimes(1);
        });

        it('should use the correct connection parameters', () => {
          const expectedHost = environment.REDISHOST;
          const expectedPort = environment.REDISPORT;
          const expectedAuth = environment.REDISAUTH;

          expect(redisMock).toHaveBeenCalledWith<[RedisOptions]>(
            expect.objectContaining<RedisOptions>({
              host: expectedHost,
              port: expectedPort,
              password: expectedAuth,
            }),
          );
        });

        it('should pass extra parameters', () => {
          expect(redisMock).toHaveBeenCalledWith<[RedisOptions]>(
            expect.objectContaining<RedisOptions>({
              lazyConnect: true,
            }),
          );
        });
      });
    });
  });
});
