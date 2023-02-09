import { EnvironmentService } from '@core/environment';
import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export class RedisProvider {
  static provide(): FactoryProvider<Redis> {
    return {
      provide: REDIS_CLIENT,
      inject: [EnvironmentService],
      useFactory(environmentService: EnvironmentService) {
        return new Redis({
          lazyConnect: true,
          host: environmentService.getEnvironmentValue('REDISHOST'),
          port: environmentService.getEnvironmentValue('REDISPORT'),
          password: environmentService.getEnvironmentValue('REDISAUTH'),
        });
      },
    };
  }
}
