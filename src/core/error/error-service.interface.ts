import { Type } from '@nestjs/common';

export type HandleErrorOptions<E> = {
  /** The error thrown by `@nestjs/axios` */
  error: E;

  /** The class from where `handleError` is called  */
  caller: Type;

  /** The method of the class from where `handleError` is called */
  methodName: string;
};

export interface ErrorService<E = Error, R = void> {
  handleError(options: HandleErrorOptions<E>): R;
}
