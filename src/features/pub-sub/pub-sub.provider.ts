import { EnvironmentService } from '@core/environment';
import { FactoryProvider } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GCPubSubClient,
  GCPubSubOptions,
} from 'nestjs-google-pubsub-microservice';

export const PUB_SUB_CLIENT = 'PUB_SUB_CLIENT';

export const PubSubProvider = {
  provide: (): FactoryProvider<ClientProxy> => {
    return {
      provide: PUB_SUB_CLIENT,
      inject: [EnvironmentService],
      useFactory: (environmentService: EnvironmentService) =>
        environmentService.isProd()
          ? createProductionClient(environmentService)
          : createDevelopmentClient(environmentService),
    };
  },
};

function createCommonOptions(
  environmentService: EnvironmentService,
): GCPubSubOptions {
  return {
    init: false,
    checkExistence: false,
    topic: environmentService.get('PUB_SUB_TOPIC'),
    client: {
      projectId: environmentService.get('PUB_SUB_PROJECT_ID'),
    },
  };
}

function createProductionClient(
  environmentService: EnvironmentService,
): ClientProxy {
  const commonOptions = createCommonOptions(environmentService);

  const options: GCPubSubOptions = {
    ...commonOptions,
    client: {
      ...commonOptions.client,
      credentials: {
        client_email: environmentService.get('PUB_SUB_CLIENT_EMAIL'),
        private_key: environmentService.get('PUB_SUB_PRIVATE_KEY'),
      },
    },
  };

  return new GCPubSubClient(options);
}

function createDevelopmentClient(
  environmentService: EnvironmentService,
): ClientProxy {
  const commonOptions = createCommonOptions(environmentService);

  const options: GCPubSubOptions = {
    ...commonOptions,
    client: {
      ...commonOptions.client,
      apiEndpoint: environmentService.get('PUB_SUB_EMULATOR_HOST'),
    },
  };

  return new GCPubSubClient(options);
}
