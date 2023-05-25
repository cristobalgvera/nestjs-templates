import { EnvironmentModule } from '@core/environment';
import { BankStandardExceptionModule } from '@core/exception-filters';
import { BankStandardSuccessModule } from '@core/interceptors';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [
    EnvironmentModule,
    BankStandardExceptionModule,
    BankStandardSuccessModule.forRoot({
      // TODO: Add proper service domain name code
      serviceDomainNameCode: 'SERVICE_DOMAIN_NAME_CODE',
    }),
  ],
  providers: [Logger],
})
export class AppModule {}
