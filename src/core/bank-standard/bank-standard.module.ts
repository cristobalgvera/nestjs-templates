import { Module } from '@nestjs/common';
import { BankStandardExceptionModule } from './exception-filters';
import {
  BankStandardHeadersModule,
  BankStandardSuccessModule,
} from './interceptors';

@Module({
  imports: [
    BankStandardExceptionModule,
    BankStandardHeadersModule,
    BankStandardSuccessModule.forRoot({
      // TODO: Add proper service domain name code
      serviceDomainNameCode: 'SERVICE_DOMAIN_NAME_CODE',
    }),
  ],
})
export class BankStandardModule {}
