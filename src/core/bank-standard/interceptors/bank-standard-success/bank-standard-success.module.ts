import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BankStandardSuccessInterceptor } from './bank-standard-success.interceptor';
import { BankStandardSuccessMapperService } from './bank-standard-success-mapper';
import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: BankStandardSuccessInterceptor },
    { provide: SERVICE_DOMAIN_NAME_CODE, useValue: SERVICE_DOMAIN_NAME_CODE },
    BankStandardSuccessMapperService,
  ],
})
export class BankStandardSuccessModule {}
