import { EnvironmentModule } from '@core/environment';
import { RedisModule } from '@features/redis';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule, RedisModule],
  providers: [Logger],
})
export class AppModule {}
