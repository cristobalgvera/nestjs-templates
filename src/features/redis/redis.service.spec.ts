import { TestBed } from '@automock/jest';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let underTest: RedisService;
  let redisClient: Redis;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RedisService).compile();

    underTest = unit;
    redisClient = unitRef.get(REDIS_CLIENT);
  });

  describe('onApplicationShutdown', () => {
    it('should call the redis client quit method', async () => {
      const redisClientSpy = jest.spyOn(redisClient, 'quit');

      await underTest.onApplicationShutdown();

      expect(redisClientSpy).toHaveBeenCalled();
    });
  });

  describe('set', () => {
    describe('when the redis client succeeds', () => {
      it('should call the redis client with provided a key/value', async () => {
        const value = { key: 'value' };

        const expectedKey = 'key';
        const expectedValue = JSON.stringify(value);

        const redisClientSpy = jest.spyOn(redisClient, 'set');

        await underTest.set(expectedKey, value);

        expect(redisClientSpy).toHaveBeenCalledWith(expectedKey, expectedValue);
      });

      it('should return the redis client response', async () => {
        const expected = 'response';

        jest.spyOn(redisClient, 'set').mockResolvedValueOnce(expected);

        const actual = await underTest.set('key', 'value');

        expect(actual).toEqual(expected);
      });
    });

    describe('when the redis client fails', () => {
      it('should throw the error thrown by the redis client', async () => {
        expect.assertions(1);

        const expected = new Error('error');

        jest.spyOn(redisClient, 'set').mockRejectedValueOnce(expected);

        try {
          await underTest.set('key', 'value');
        } catch (actual) {
          expect(actual).toEqual(expected);
        }
      });
    });
  });

  describe('get', () => {
    describe('when the redis client succeeds', () => {
      beforeEach(() => {
        jest
          .spyOn(redisClient, 'get')
          .mockResolvedValue(JSON.stringify({ value: 'id' }));
      });

      describe('when calling redis client', () => {
        it('should call the redis client with provided key', async () => {
          const expected = 'key';

          const redisClientSpy = jest.spyOn(redisClient, 'get');

          await underTest.get(expected);

          expect(redisClientSpy).toHaveBeenCalledWith(expected);
        });

        describe('when the key has not been set', () => {
          it('should throw an error', async () => {
            expect.assertions(1);

            const expected = 'expected_key';

            jest
              .spyOn(redisClient, 'get')
              .mockReset()
              .mockResolvedValueOnce(null);

            try {
              await underTest.get(expected);
            } catch (actual) {
              expect(actual.message).toMatch(expected);
            }
          });
        });
      });

      describe('when the parse succeeds', () => {
        it('should get a parsed value', async () => {
          const expected = { expected: 'id' };

          jest
            .spyOn(redisClient, 'get')
            .mockReset()
            .mockResolvedValueOnce(JSON.stringify(expected));

          const actual = await underTest.get('key');

          expect(actual).toEqual(expected);
        });
      });

      describe('when the parse fails', () => {
        it('should throw an error', async () => {
          const expected = 'key';

          jest
            .spyOn(redisClient, 'get')
            .mockReset()
            .mockResolvedValueOnce('value');

          try {
            await underTest.get(expected);
          } catch (actual) {
            expect(actual.message).toEqual(expect.stringContaining(expected));
          }
        });
      });
    });

    describe('when the redis client fails', () => {
      it('should throw the error thrown by the redis client', async () => {
        expect.assertions(1);

        const expected = new Error('error');

        jest.spyOn(redisClient, 'get').mockRejectedValueOnce(expected);

        try {
          await underTest.get('key');
        } catch (actual) {
          expect(actual).toEqual(expected);
        }
      });
    });
  });

  describe('getRaw', () => {
    beforeEach(() => {
      jest.spyOn(redisClient, 'get').mockResolvedValue('value');
    });

    describe('when calling redis client', () => {
      describe('when the redis client succeeds', () => {
        it('should call the redis client with provided key', async () => {
          const expected = 'key';

          const redisClientSpy = jest.spyOn(redisClient, 'get');

          await underTest.getRaw(expected);

          expect(redisClientSpy).toHaveBeenCalledWith(expected);
        });

        describe.each(['value', null])(
          'when returning the redis client response for %s',
          (response) => {
            beforeEach(() => {
              jest.spyOn(redisClient, 'get').mockResolvedValueOnce(response);
            });

            it('should return the redis client response', async () => {
              const expected = await underTest.getRaw('key');

              expect(expected).toEqual(response);
            });
          },
        );
      });
      describe('when the redis client fails', () => {
        it('should throw the error thrown by the redis client', () => {
          expect.hasAssertions();

          const expected = new Error('error');

          jest.spyOn(redisClient, 'get').mockRejectedValueOnce(expected);

          expect(() => underTest.getRaw('key')).rejects.toThrowError(expected);
        });
      });
    });
  });
});
