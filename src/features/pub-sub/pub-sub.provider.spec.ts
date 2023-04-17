import { Environment, EnvironmentService } from '@core/environment';
import { createMock } from '@golevelup/ts-jest';
import { FactoryProvider } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GCPubSubClient,
  GCPubSubOptions,
} from 'nestjs-google-pubsub-microservice';
import { PubSubProvider, PUB_SUB_CLIENT } from './pub-sub.provider';

jest.mock('nestjs-google-pubsub-microservice', () => ({
  GCPubSubClient: jest.fn(),
}));

const GCPubSubClientMock = jest.mocked(GCPubSubClient);

describe('PubSubProvider', () => {
  describe('provide', () => {
    let provider: FactoryProvider<ClientProxy>;

    beforeEach(() => {
      provider = PubSubProvider.provide();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('token', () => {
      it('should provide the proper token', () => {
        const actual = provider.provide;

        expect(actual).toEqual(PUB_SUB_CLIENT);
      });
    });

    describe('factory', () => {
      const environment = {
        PUB_SUB_PROJECT_ID: 'project-id',
        PUB_SUB_EMULATOR_HOST: 'api-endpoint',
        PUB_SUB_TOPIC: 'topic',
        PUB_SUB_CLIENT_EMAIL: 'client-email',
        PUB_SUB_PRIVATE_KEY: 'private-key',
      } as Environment;

      let actual: ClientProxy;

      describe.each([{ isProd: true }, { isProd: false }])(
        'common behavior when production mode is $isProd',
        ({ isProd }) => {
          beforeEach(async () => {
            actual = await provider.useFactory(
              createMock<EnvironmentService>({
                get: (key: keyof Environment) => environment[key],
                isProd: () => isProd,
              }),
            );
          });

          it('should provide the proper factory', () => {
            expect(actual).toBeInstanceOf(GCPubSubClient);
          });

          it('should call the PubSub constructor once', () => {
            expect(GCPubSubClientMock).toHaveBeenCalledTimes(1);
          });

          it('should call the PubSub constructor with the common parameters', () => {
            expect(GCPubSubClientMock).toHaveBeenCalledWith(
              expect.objectContaining<GCPubSubOptions>({
                init: false,
                topic: environment.PUB_SUB_TOPIC,
                client: expect.objectContaining({
                  projectId: environment.PUB_SUB_PROJECT_ID,
                }),
              }),
            );
          });
        },
      );

      describe('when is in production mode', () => {
        beforeEach(async () => {
          actual = await provider.useFactory(
            createMock<EnvironmentService>({
              get: (key: keyof Environment) => environment[key],
              isProd: () => true,
            }),
          );
        });

        it('should call the PubSub constructor with production parameters', () => {
          expect(GCPubSubClientMock).toHaveBeenCalledWith(
            expect.objectContaining<GCPubSubOptions>({
              client: expect.objectContaining<GCPubSubOptions['client']>({
                credentials: {
                  client_email: environment.PUB_SUB_CLIENT_EMAIL,
                  private_key: environment.PUB_SUB_PRIVATE_KEY,
                },
              }),
            }),
          );
        });
      });

      describe('when is not in production mode', () => {
        beforeEach(async () => {
          actual = await provider.useFactory(
            createMock<EnvironmentService>({
              get: (key: keyof Environment) => environment[key],
              isProd: () => false,
            }),
          );
        });

        it('should call the PubSub constructor with non-production parameters', () => {
          expect(GCPubSubClientMock).toHaveBeenCalledWith(
            expect.objectContaining<GCPubSubOptions>({
              client: expect.objectContaining<GCPubSubOptions['client']>({
                apiEndpoint: environment.PUB_SUB_EMULATOR_HOST,
              }),
            }),
          );
        });
      });
    });
  });
});
