import { ResultDto } from './result.dto';

export type BankStandardResponseDto<ServiceDomainNameCode extends string> =
  Readonly<
    Record<`Response${ServiceDomainNameCode}`, unknown> & { Result: ResultDto }
  >;
