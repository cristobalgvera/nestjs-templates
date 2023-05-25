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
        return {
          Result: { status: ResultStatus.OK, description: '' },
          [`Response${serviceDomainNameCode}`]: data,
        } as any; // FIX: Find a proper way to type this
      },
    };
  }
}
