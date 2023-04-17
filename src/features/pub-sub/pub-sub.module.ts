import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';
import { PubSubProvider } from './pub-sub.provider';
import { PubSubService } from './pub-sub.service';

@Module({
  imports: [EnvironmentModule],
  providers: [PubSubService, PubSubProvider.provide(), Logger],
  exports: [PubSubService],
})
export class PubSubModule {}
