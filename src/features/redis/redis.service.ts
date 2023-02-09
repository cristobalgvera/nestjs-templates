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

  async set(key: string, data: unknown) {
    return await this.redisClient.set(key, JSON.stringify(data));
  }

  async get(key: string): Promise<string> {
    const data = await this.redisClient.get(key);

    if (data === null) throw new Error(`Key ${key} has not been set`);

    return data;
  }

  async getObject<T = unknown>(key: string): Promise<T> {
    const data = await this.get(key);

    try {
      return JSON.parse(data);
    } catch (error) {
      throw new InternalServerErrorException(
        `Value for key ${key} is not a valid JSON string`,
      );
    }
  }
}
