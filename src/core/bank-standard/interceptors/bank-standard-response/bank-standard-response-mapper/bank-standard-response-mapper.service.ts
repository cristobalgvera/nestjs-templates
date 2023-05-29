import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ResultStatus } from '../constants';
import { BankStandardResponseDto } from '../dto';

@Injectable()
export class BankStandardResponseMapperService<
  ServiceDomainNameCode extends string,
> {
  constructor(
    @Inject(SERVICE_DOMAIN_NAME_CODE)
    private readonly serviceDomainNameCode: ServiceDomainNameCode,
    private readonly logger: Logger,
  ) {}

  map(data: unknown): BankStandardResponseDto<ServiceDomainNameCode> {
    // @ts-expect-error - Dynamic property name can't be inferred
    const response: ReturnType<typeof this.map> = {
      Result: { status: ResultStatus.OK, description: '' },
      [`Response${this.serviceDomainNameCode}`]: data,
    };

    this.logger.log(`Response data: ${JSON.stringify(response)}`);

    return response;
  }
}
