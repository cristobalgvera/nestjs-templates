import { EnvironmentService } from '@core/environment';
import { PubSub } from '@google-cloud/pubsub';
import {
  GCPubSubClient,
  GCPubSubOptions,
} from 'nestjs-google-pubsub-microservice';

/**
 * Wrapper class to allow for development mode to modify
 * the subscription push
 */
export class CustomGCPubSubClient extends GCPubSubClient {
  constructor(
    protected readonly options: GCPubSubOptions,
    protected readonly environmentService: EnvironmentService,
  ) {
    super(options);
  }

  async connect(): Promise<PubSub> {
    const pubSub = await super.connect();

    this.DEVELOPMENT_modifySubscriptionPushConfig();

    return pubSub;
  }

  private async DEVELOPMENT_modifySubscriptionPushConfig() {
    if (this.environmentService.isProd()) return;

    if (!this.topic) return;

    const subscription = this.topic.subscription(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.environmentService.get('PUB_SUB_SUBSCRIPTION')!,
    );

    const [exists] = await subscription.exists();

    const pushEndpoint = this.environmentService.get('PUB_SUB_PUSH_ENDPOINT');

    if (exists) await subscription.modifyPushConfig({ pushEndpoint });
    else await subscription.create({ pushConfig: { pushEndpoint } });
  }
}
