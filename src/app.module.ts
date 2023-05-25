import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BankStandardExceptionModule } from '@core/exception-filters';

@Module({
  imports: [EnvironmentModule, BankStandardExceptionModule],
  providers: [Logger],
  controllers: [AppController],
})
export class AppModule {}
