import { ResultDto } from './result.dto';

export type BankStandardSuccessResponseDto<
  ServiceDomainNameCode extends string,
> = Readonly<
  Record<`Response${ServiceDomainNameCode}`, unknown> & { Result: ResultDto }
>;
