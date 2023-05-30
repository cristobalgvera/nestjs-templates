import { BankStandardHeadersModuleOptions } from './interceptors';

export type BankStandardModuleOptions = Readonly<{
  headers: BankStandardHeadersModuleOptions;
}>;
