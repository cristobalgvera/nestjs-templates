import { EnvironmentModule } from '@core/environment';
import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
  imports: [EnvironmentModule],
  providers: [RedisProvider.provide(), RedisService],
  exports: [RedisService],
})
export class RedisModule {}
