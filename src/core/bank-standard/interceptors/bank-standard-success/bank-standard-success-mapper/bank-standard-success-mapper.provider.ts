import { ResultStatus } from '../constants';
import { BankStandardSuccessResponseDto } from '../dto';
import { BankStandardSuccessMapperService } from './bank-standard-success-mapper.service';

export class BankStandardSuccessMapperProvider {
  static provide<ServiceDomainNameCode extends string>(
    serviceDomainNameCode: ServiceDomainNameCode,
  ): BankStandardSuccessMapperService<ServiceDomainNameCode> {
    return {
      map: (
        data: unknown,
      ): BankStandardSuccessResponseDto<ServiceDomainNameCode> => {
        // @ts-expect-error - Dynamic property name can't be infered
        return {
          Result: { status: ResultStatus.OK, description: '' },
          [`Response${serviceDomainNameCode}`]: data,
        };
      },
    };
  }
}
