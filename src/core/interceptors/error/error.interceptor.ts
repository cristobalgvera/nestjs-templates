import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, of } from 'rxjs';

/**
 * This interceptor is used to catch all errors thrown by the controller
 * in order to return a consistent error response without sending the
 * actual HTTP error code.
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
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error: Error) => {
        this.logger.warn(
          `There was an error processing the request: ${error.message}`,
          ErrorInterceptor.name,
        );

        return of({
          status: 'Error',
          error: error.name,
          message: error.message,
        });
      }),
    );
  }
}
