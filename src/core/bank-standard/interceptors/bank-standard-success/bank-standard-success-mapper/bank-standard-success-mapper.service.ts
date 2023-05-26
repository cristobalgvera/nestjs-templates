import { BankStandardSuccessResponseDto } from '../dto';

export const BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN =
  'BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN';

export interface BankStandardSuccessMapperService<
  ServiceDomainNameCode extends string,
> {
  map: (data: unknown) => BankStandardSuccessResponseDto<ServiceDomainNameCode>;
}
