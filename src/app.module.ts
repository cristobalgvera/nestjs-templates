import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';
import { BankStandardExceptionModule } from '@core/exception-filters';

@Module({
  imports: [EnvironmentModule, BankStandardExceptionModule],
  providers: [Logger],
})
export class AppModule {}
