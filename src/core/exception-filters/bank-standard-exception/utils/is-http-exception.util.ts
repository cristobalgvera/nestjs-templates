import { HttpException } from '@nestjs/common';

export function isHttpException(exception: Error): exception is HttpException {
  return exception instanceof HttpException;
}
