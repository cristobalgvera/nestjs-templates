import { EnvironmentModule } from '@core/environment';
import { RedisModule } from '@features/redis';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule, RedisModule],
  providers: [{ provide: Logger, useValue: new Logger(AppModule.name) }],
})
export class AppModule {}
