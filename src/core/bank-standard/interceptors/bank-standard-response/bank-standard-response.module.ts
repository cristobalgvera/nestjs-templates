import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import { BankStandardResponseInterceptor } from './bank-standard-response.interceptor';
import { BankStandardResponseMapperService } from './bank-standard-response-mapper';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: BankStandardResponseInterceptor },
    { provide: SERVICE_DOMAIN_NAME_CODE, useValue: SERVICE_DOMAIN_NAME_CODE },
    { provide: Logger, useValue: new Logger(BankStandardResponseModule.name) },
    BankStandardResponseMapperService,
  ],
})
export class BankStandardResponseModule {}
