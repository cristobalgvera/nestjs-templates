import { DatabaseModule } from '@core/database';
import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule, DatabaseModule],
  providers: [{ provide: Logger, useValue: new Logger(AppModule.name) }],
})
export class AppModule {}
