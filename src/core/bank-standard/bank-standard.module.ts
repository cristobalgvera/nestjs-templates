import { Module } from '@nestjs/common';
import { SERVICE_DOMAIN_NAME_CODE } from './constants';
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
      serviceDomainNameCode: SERVICE_DOMAIN_NAME_CODE,
    }),
  ],
})
export class BankStandardModule {}
