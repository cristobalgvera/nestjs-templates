import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { BankStandardSuccessMapperService } from './bank-standard-success-mapper';

@Injectable()
export class BankStandardSuccessInterceptor implements NestInterceptor {
  constructor(
    private readonly successMapperService: BankStandardSuccessMapperService<string>,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler<unknown>) {
    return next
      .handle()
      .pipe(map((data) => this.successMapperService.map(data)));
  }
}
