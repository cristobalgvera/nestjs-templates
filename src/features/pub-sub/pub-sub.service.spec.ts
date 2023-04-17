import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PUB_SUB_CLIENT } from './pub-sub.provider';
import { PubSubService } from './pub-sub.service';
import { PublishMessageOptions } from './types';

describe('PubSubService', () => {
  let underTest: PubSubService;
  let logger: Logger;
  let pubSubClient: ClientProxy;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PubSubService).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
    pubSubClient = unitRef.get(PUB_SUB_CLIENT);
  });

  describe('onApplicationShutdown', () => {
    it('should close the client proxy connection', async () => {
      const clientProxySpy = jest.spyOn(pubSubClient, 'close');

      await underTest.onApplicationShutdown();

      expect(clientProxySpy).toHaveBeenCalled();
    });
  });

  describe('publishMessage', () => {
    function commonOptions(
      override?: Partial<PublishMessageOptions>,
    ): PublishMessageOptions {
      return {
        pattern: 'pattern',
        payload: 'payload',
        ...override,
      };
    }

    beforeEach(() => {
      jest.spyOn(pubSubClient, 'emit').mockReturnValueOnce(of({}));
    });

    describe('when the message is published successfully', () => {
      it('should publish the message using the pub-sub client', async () => {
        const pubSubClientSpy = jest.spyOn(pubSubClient, 'emit');

        await firstValueFrom(underTest.publishMessage(commonOptions()));

        expect(pubSubClientSpy).toHaveBeenCalled();
      });

      it('should publish the message with the correct arguments', async () => {
        const expectedPayload = 'expected_payload';
        const expectedPattern = 'expected_pattern';

        const pubSubClientSpy = jest.spyOn(pubSubClient, 'emit');

        await firstValueFrom(
          underTest.publishMessage(
            commonOptions({
              payload: expectedPayload,
              pattern: expectedPattern,
            }),
          ),
        );

        expect(pubSubClientSpy).toHaveBeenCalledWith<
          Parameters<ClientProxy['emit']>
        >(expectedPattern, expectedPayload);
      });
    });

    describe('when the publish message fails', () => {
      it('should log the error', async () => {
        expect.hasAssertions();

        jest
          .spyOn(pubSubClient, 'emit')
          .mockReset()
          .mockReturnValueOnce(throwError(() => new Error()));

        const loggerSpy = jest.spyOn(logger, 'error');

        try {
          await firstValueFrom(underTest.publishMessage(commonOptions()));
        } catch (error) {
          // Ignore the error
        } finally {
          expect(loggerSpy).toHaveBeenCalled();
        }
      });

      it('should throw a custom error with the actual error message', async () => {
        expect.hasAssertions();

        const expected = new Error('message');

        jest
          .spyOn(pubSubClient, 'emit')
          .mockReset()
          .mockReturnValueOnce(throwError(() => expected));

        await expect(() =>
          firstValueFrom(underTest.publishMessage(commonOptions())),
        ).rejects.toThrow(expected.message);
      });
    });
  });
});
