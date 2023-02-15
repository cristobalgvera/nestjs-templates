import { Logger, Module } from '@nestjs/common';
import { HttpErrorService } from './http-error';

@Module({
  providers: [Logger, HttpErrorService],
  exports: [HttpErrorService],
})
export class ErrorModule {}
