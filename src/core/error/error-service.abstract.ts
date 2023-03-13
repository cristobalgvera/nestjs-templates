import { Logger, Type } from '@nestjs/common';

export type HandleErrorOptions<E extends Error> = {
  /** The error to handle */
  error: E;

  /** The class from where `handleError` is called  */
  caller: Type;

  /** The method of the class from where `handleError` is called */
  method: (...args: unknown[]) => unknown;
};

type HandleErrorOptionsSchema<E extends Error> = Pick<
  HandleErrorOptions<E>,
  'error'
> &
  Partial<Omit<HandleErrorOptions<E>, 'error'>>;

export abstract class ErrorService<
  Err extends Error = Error,
  Resp = void,
  Opts extends HandleErrorOptionsSchema<Err> = HandleErrorOptions<Err>,
> {
  private readonly _logger = new Logger(ErrorService.name);

  /**
   * This method must return, if required, the exception to be handled
   * by the NestJS exception filter.
   */
  protected abstract throwException(error: Err): Resp;

  /**
   * This method must validate the error to be handled, e.g., in case
   * that only one type of error must be handled and you need to validate
   * it in runtime.
   */
  protected validateError?(error: Err): void;

  /**
   * This method is responsible for handling errors that are thrown by any
   * required context.
   *
   * It will log the error and then throw an exception based on the actual
   * error.
   *
   * ---
   *
   * Usage example:
   *
   * try {
   *   // Implementation...
   * } catch (error) {
   *   this.errorService.handleError({
   *     error,
   *     caller: MyCallerClass,
   *     method: this.myCallerMethod,
   *   }),
   * }
   */
  handleError(options: Opts): Resp {
    this.validateError?.(options.error);

    this.logError(options);

    return this.throwException(options.error);
  }

  /**
   * This method must log the error in any required context.
   */
  protected logError(options: Opts): void {
    const { caller, method, error } = options;

    this._logger.error(
      `[${caller?.name}: ${method?.name}] ${error.message}`,
      error.stack,
    );
  }
}
