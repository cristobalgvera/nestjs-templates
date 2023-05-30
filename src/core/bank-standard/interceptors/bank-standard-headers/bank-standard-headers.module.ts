import { DynamicModule, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BankStandardHeadersModuleOptions } from './bank-standard-headers-module-options.dto';
import { BankStandardHeadersInterceptor } from './bank-standard-headers.interceptor';
import { RequestHeadersService } from './request-headers/request-headers.service';
import { RESPONSE_HEADERS_SERVICE_OPTIONS } from './response-headers';
import { ResponseHeadersService } from './response-headers/response-headers.service';

@Module({})
export class BankStandardHeadersModule {
  static forRoot(options: BankStandardHeadersModuleOptions): DynamicModule {
    const { responseHeaders } = options;

    return {
      module: BankStandardHeadersModule,
      providers: [
        { provide: APP_INTERCEPTOR, useClass: BankStandardHeadersInterceptor },
        {
          provide: RESPONSE_HEADERS_SERVICE_OPTIONS,
          useValue: responseHeaders,
        },
        {
          provide: Logger,
          useValue: new Logger(BankStandardHeadersModule.name),
        },
        RequestHeadersService,
        ResponseHeadersService,
      ],
    };
  }
}
