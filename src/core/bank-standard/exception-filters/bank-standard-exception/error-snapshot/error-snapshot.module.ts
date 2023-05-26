import { Module } from '@nestjs/common';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';
import { ErrorSnapshotService } from './error-snapshot.service';

@Module({
  providers: [ErrorSnapshotService, ErrorSnapshotHelperService],
  exports: [ErrorSnapshotService],
})
export class ErrorSnapshotModule {}
