import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs';
import { PUB_SUB_CLIENT } from './pub-sub.provider';
import { PublishMessageOptions } from './types';

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
      timeout(10_000),
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
