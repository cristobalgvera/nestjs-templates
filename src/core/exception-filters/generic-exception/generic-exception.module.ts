import { Logger, Module } from '@nestjs/common';
import { ErrorSnapshotService } from './error-snapshot';
import { ErrorSnapshotHelperService } from './error-snapshot/error-snapshot-helper.service';

@Module({
  providers: [
    Logger,
    ErrorSnapshotService,
    ErrorSnapshotHelperService,
    // { provide: APP_FILTER, useClass: GenericExceptionFilter },
  ],
  exports: [ErrorSnapshotService],
})
export class GenericExceptionModule {}
