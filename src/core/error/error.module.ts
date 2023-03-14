import { Logger, Module } from '@nestjs/common';
import { HttpErrorService } from './http-error';
import { RuntimeErrorService } from './runtime-error/runtime-error.service';

@Module({
  providers: [Logger, HttpErrorService, RuntimeErrorService],
  exports: [HttpErrorService, RuntimeErrorService],
})
export class ErrorModule {}
