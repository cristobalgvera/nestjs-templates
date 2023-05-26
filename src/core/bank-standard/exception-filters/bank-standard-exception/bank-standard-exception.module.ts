import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BankStandardExceptionFilter } from './bank-standard-exception.filter';
import { ErrorSnapshotModule } from './error-snapshot';

@Module({
  imports: [ErrorSnapshotModule],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: BankStandardExceptionFilter },
  ],
})
export class BankStandardExceptionModule {}
