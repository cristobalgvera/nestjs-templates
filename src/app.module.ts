import { EnvironmentModule } from '@core/environment';
import { PubSubModule } from '@features/pub-sub';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule, PubSubModule],
  providers: [{ provide: Logger, useValue: new Logger(AppModule.name) }],
})
export class AppModule {}
