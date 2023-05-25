import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BankStandardSuccessInterceptor } from './bank-standard-success.interceptor';
import {
  BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN,
  BankStandardSuccessMapperProvider,
} from './bank-standard-success-mapper';

type BankStandardSuccessModuleOptions<ServiceDomainNameCode extends string> =
  Readonly<{
    serviceDomainNameCode: ServiceDomainNameCode;
  }>;

@Module({})
export class BankStandardSuccessModule {
  static forRoot<ServiceDomainNameCode extends string>(
    options: BankStandardSuccessModuleOptions<ServiceDomainNameCode>,
  ): DynamicModule {
    const { serviceDomainNameCode } = options;

    return {
      module: BankStandardSuccessModule,
      providers: [
        { provide: APP_INTERCEPTOR, useClass: BankStandardSuccessInterceptor },
        {
          provide: BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN,
          useValue: BankStandardSuccessMapperProvider.provide(
            serviceDomainNameCode,
          ),
        },
      ],
    };
  }
}
