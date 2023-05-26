import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BankStandardHeadersInterceptor } from './bank-standard-headers.interceptor';
import { RequestHeadersService } from './request-headers/request-headers.service';
import { ResponseHeadersService } from './response-headers/response-headers.service';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: BankStandardHeadersInterceptor },
    RequestHeadersService,
    ResponseHeadersService,
    Logger,
  ],
})
export class BankStandardHeadersModule {}
