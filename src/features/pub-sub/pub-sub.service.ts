import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PUB_SUB_CLIENT } from './pub-sub.provider';
import { PublishMessageOptions, SendMessageOptions } from './types';

@Injectable()
export class PubSubService implements OnApplicationShutdown {
  constructor(
    @Inject(PUB_SUB_CLIENT)
    private readonly pubSubClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  onApplicationShutdown() {
    return this.pubSubClient.close();
  }

  publishMessage({ payload, pattern }: PublishMessageOptions) {
    return this.pubSubClient.emit<void>(pattern, payload).pipe(
      catchError((error) => {
        this.logger.error(
          `[${PubSubService.name}: ${this.publishMessage.name}] ${error.message}`,
          error.stack,
        );

        throw new InternalServerErrorException(error.message);
      }),
    );
  }

  sendMessage<TResponse = unknown>({ payload, pattern }: SendMessageOptions) {
    return this.pubSubClient.send<TResponse>(pattern, payload).pipe(
      catchError((error) => {
        this.logger.error(
          `[${PubSubService.name}: ${this.publishMessage.name}] ${error.message}`,
          error.stack,
        );

        throw new InternalServerErrorException(error.message);
      }),
    );
  }
}
