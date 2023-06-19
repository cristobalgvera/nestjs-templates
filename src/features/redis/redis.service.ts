import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {}

  onApplicationShutdown() {
    return this.redisClient.quit();
  }

  /**
   * @param ttl Time to live in seconds
   */
  set(key: string, data: unknown, ttl?: number) {
    const stringifiedData = JSON.stringify(data);

    return ttl !== undefined
      ? this.redisClient.set(key, stringifiedData, 'EX', ttl)
      : this.redisClient.set(key, stringifiedData);
  }

  async get<TResult = unknown>(key: string): Promise<TResult> {
    const data = await this.getRaw(key);

    if (data === null) throw new Error(`Key ${key} has not been set`);

    try {
      return JSON.parse(data) as TResult;
    } catch (error) {
      throw new InternalServerErrorException(
        `Value for key ${key} is not a valid JSON string`,
      );
    }
  }

  getRaw(key: string) {
    return this.redisClient.get(key);
  }
}
