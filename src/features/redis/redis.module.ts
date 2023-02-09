import { EnvironmentModule } from '@core/environment';
import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';

@Module({
  imports: [EnvironmentModule],
  providers: [RedisProvider.provide()],
})
export class RedisModule {}
