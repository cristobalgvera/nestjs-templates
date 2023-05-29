import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ResultStatus } from '../constants';
import { BankStandardSuccessResponseDto } from '../dto';

@Injectable()
export class BankStandardSuccessMapperService<
  ServiceDomainNameCode extends string,
> {
  constructor(
    @Inject(SERVICE_DOMAIN_NAME_CODE)
    private readonly serviceDomainNameCode: ServiceDomainNameCode,
  ) {}

  map(data: unknown): BankStandardSuccessResponseDto<ServiceDomainNameCode> {
    // @ts-expect-error - Dynamic property name can't be inferred
    return {
      Result: { status: ResultStatus.OK, description: '' },
      [`Response${this.serviceDomainNameCode}`]: data,
    };
  }
}
