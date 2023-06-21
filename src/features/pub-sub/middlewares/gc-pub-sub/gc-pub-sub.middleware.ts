import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { eventPatternSchema, RequestBody, requestBodySchema } from './schema';

/**
 * This middleware helps to properly parse the data send out by the
 * GCP Pub/Sub.
 *
 * It will check if the data comes with the format defined by Google,
 * extract the relevant data on it (the one that the client sends),
 * decode it from base64, and parse it as JSON.
 *
 * @see https://cloud.google.com/pubsub/docs/push#receive_push
 */
@Injectable()
export class GCPubSubMiddleware implements NestMiddleware<Request> {
  constructor(private readonly logger: Logger) {}

  use(request: Request, _: Response, next: () => void) {
    const requestBody = this.validateBody(request.body);
    if (!requestBody) return next();

    const data = this.mapData(requestBody);
    if (!data) return next();

    request.body = data;

    this.logger.log(
      `Pre-processed data: ${JSON.stringify(request.body)}`,
      GCPubSubMiddleware.name,
    );

    next();
  }

  private validateBody(body: unknown) {
    const validation = requestBodySchema.validate(body, {
      abortEarly: false,
    });

    if (!validation.error) return validation.value;

    this.logger.warn(
      `Invalid: ${
        validation.error.message
      }, body will not be pre-processed (${JSON.stringify(body)})`,
      GCPubSubMiddleware.name,
    );
  }

  private mapData({ message: { data } }: RequestBody) {
    const decodedData = Buffer.from(data, 'base64').toString('utf8');
    let parsedData: unknown;

    try {
      parsedData = JSON.parse(decodedData);
    } catch (err) {
      this.logger.warn(
        `Invalid: data is not a valid JSON (${decodedData})`,
        GCPubSubMiddleware.name,
      );
      return;
    }

    return this.validateEventPattern(parsedData);
  }

  private validateEventPattern(value: unknown) {
    const validation = eventPatternSchema.validate(value, {
      abortEarly: false,
    });

    if (!validation.error) return validation.value.data;

    this.logger.warn(
      `Invalid: ${
        validation.error.message
      }, data will not be pre-processed (${JSON.stringify(value)})`,
      GCPubSubMiddleware.name,
    );
  }
}
