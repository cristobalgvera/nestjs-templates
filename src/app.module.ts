import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule],
  providers: [Logger],
})
export class AppModule {}
