import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { GenericErrorResponseDto } from './dto';

/**
 * This exception filter is used to catch all errors thrown by the
 * application in order to return a consistent error response without
 * sending the actual HTTP error code.
 *
 * This is useful due to the fact that the GCP Pub/Sub is being used
 * in push mode, which means that the HTTP response code is not
 * considered by the GCP Pub/Sub. In fact, the GCP Pub/Sub will
 * consider only 102, 200, 201, 202, and 204 as successful responses.
 * Any other response code will be considered as a failure and the ACK
 * will not be sent.
 *
 * @see https://cloud.google.com/pubsub/docs/push#receive_push
 */
@Catch()
export class GenericErrorFilter<
  TError extends Error = Error,
> extends BaseExceptionFilter<TError> {
  constructor(private readonly logger: Logger) {
    super();
  }

  override catch(exception: TError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { detail, status } = this.extractExceptionData(exception);

    this.logger.error(
      `There was an error processing the request: ${JSON.stringify(detail)}`,
      undefined,
      GenericErrorFilter.name,
    );

    const responseBody: GenericErrorResponseDto = {
      status,
      error: exception.name,
      detail,
    };

    response.status(HttpStatus.ACCEPTED).json(responseBody);
  }

  private extractExceptionData(exception: TError) {
    let detail: string | object = exception.message;
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      detail = exception.getResponse();
      status = exception.getStatus();
    }

    return { detail, status };
  }
}
