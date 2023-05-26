import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';
import { BankStandardModule } from '@core/bank-standard';

@Module({
  imports: [EnvironmentModule, BankStandardModule],
  providers: [Logger],
})
export class AppModule {}
