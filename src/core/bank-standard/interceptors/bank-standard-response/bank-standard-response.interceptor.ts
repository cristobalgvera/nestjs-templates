import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { BankStandardResponseMapperService } from './bank-standard-response-mapper';

@Injectable()
export class BankStandardResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly successMapperService: BankStandardResponseMapperService<string>,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler<unknown>) {
    return next
      .handle()
      .pipe(map((data) => this.successMapperService.map(data)));
  }
}
