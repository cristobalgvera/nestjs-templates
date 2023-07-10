import { BankStandardRequestHeadersDto } from '@core/bank-standard/interceptors/bank-standard-headers/request-headers';

export const HTTP_CONFIG_OPTIONS = 'HTTP_CONFIG_OPTIONS';

export type HttpConfigOptionsHeaders = {
  [Key in keyof BankStandardRequestHeadersDto]: string;
};

export interface HttpConfigOptions {
  headers: Omit<
    HttpConfigOptionsHeaders,
    'trace-source-id' | 'trace-client-req-timestamp'
  >;
}
