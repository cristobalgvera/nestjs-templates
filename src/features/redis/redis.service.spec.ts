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
        jest.spyOn(redisClient, 'get').mockResolvedValue('value');
      });

      it('should get a value', async () => {
        const expected = 'value';

        jest
          .spyOn(redisClient, 'get')
          .mockReset()
          .mockResolvedValueOnce(expected);

        const actual = await underTest.get('key');

        expect(actual).toEqual(expected);
      });

      it('should call the redis client with provided key', async () => {
        const expected = 'key';

        const redisClientSpy = jest.spyOn(redisClient, 'get');

        await underTest.get(expected);

        expect(redisClientSpy).toHaveBeenCalledWith(expected);
      });

      it('should throw an error if the key has not been set', async () => {
        expect.assertions(1);

        const expected = 'expected_key';

        jest.spyOn(redisClient, 'get').mockReset().mockResolvedValueOnce(null);

        try {
          await underTest.get(expected);
        } catch (actual) {
          expect(actual.message).toMatch(expected);
        }
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

  describe('getObject', () => {
    beforeEach(() => {
      jest
        .spyOn(redisClient, 'get')
        .mockResolvedValue(JSON.stringify({ value: 'id' }));
    });

    describe('when the parse succeeds', () => {
      it('should get a parsed value', async () => {
        const expected = { expected: 'id' };

        jest
          .spyOn(redisClient, 'get')
          .mockReset()
          .mockResolvedValueOnce(JSON.stringify(expected));

        const actual = await underTest.getObject('key');

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
          await underTest.getObject(expected);
        } catch (actual) {
          expect(actual.message).toMatch(expected);
        }
      });
    });
  });
});
