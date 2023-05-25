import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BankStandardSuccessResponseDto } from './dto';
import {
  BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN,
  BankStandardSuccessMapperService,
} from './bank-standard-success-mapper';

@Injectable()
export class BankStandardSuccessInterceptor
  implements NestInterceptor<unknown, BankStandardSuccessResponseDto<any>>
{
  constructor(
    @Inject(BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN)
    private readonly successMapperService: BankStandardSuccessMapperService<any>,
  ) {}

  intercept(
    _: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<BankStandardSuccessResponseDto<any>> {
    return next
      .handle()
      .pipe(map((data) => this.successMapperService.map(data)));
  }
}
