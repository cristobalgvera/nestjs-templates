import { HttpStatus, Injectable } from '@nestjs/common';
import { isHttpException } from '../utils';
import { CanonicalErrorType } from './types';
import { isArray, isObject, isString } from 'class-validator';

@Injectable()
export class ErrorSnapshotHelperService {
  private static codes = new Map(Object.entries(HttpStatus));
  static NEG_HTTP_STATUS_CODES = new Set([HttpStatus.INTERNAL_SERVER_ERROR]);
  static SEG_HTTP_STATUS_CODES = new Set([
    HttpStatus.UNAUTHORIZED,
    HttpStatus.FORBIDDEN,
  ]);

  getType(httpStatus: HttpStatus, exception: Error): CanonicalErrorType {
    if (!isHttpException(exception)) return 'TEC';

    if (ErrorSnapshotHelperService.SEG_HTTP_STATUS_CODES.has(httpStatus))
      return 'SEG';

    if (ErrorSnapshotHelperService.NEG_HTTP_STATUS_CODES.has(httpStatus))
      return 'NEG';

    return 'TEC';
  }

  getCode(httpStatus: HttpStatus) {
    return ErrorSnapshotHelperService.codes.get(httpStatus.toString());
  }

  getDescription(exception: Error) {
    if (!isHttpException(exception)) return exception.message;

    const response = exception.getResponse();
    if (!this.hasMessage(response)) return exception.message;

    return response.message;
  }

  private hasMessage(obj: unknown): obj is { message: string | string[] } {
    return (
      isObject(obj) &&
      'message' in obj &&
      (isString(obj.message) || isArray<string>(obj.message))
    );
  }
}
