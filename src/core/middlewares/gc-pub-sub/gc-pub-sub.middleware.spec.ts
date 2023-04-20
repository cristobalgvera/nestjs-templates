import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import { GCPubSubMiddleware } from './gc-pub-sub.middleware';
import {
  EventPattern,
  eventPatternSchema,
  RequestBody,
  requestBodySchema,
} from './schema';

jest.mock('./schema', () => ({
  requestBodySchema: {
    validate: jest.fn(() => ({})),
  },
  eventPatternSchema: {
    validate: jest.fn(() => ({})),
  },
}));

const requestBodySchemaValidateMock = jest.mocked(requestBodySchema.validate);
const eventPatternSchemaValidateMock = jest.mocked(eventPatternSchema.validate);

describe('PubSubMiddleware', () => {
  let underTest: GCPubSubMiddleware;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GCPubSubMiddleware).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
  });

  describe('use', () => {
    describe('when processing the request body', () => {
      const commonRequestBodyValidation = {
        error: {
          details: ['error details'],
          message: 'error message',
        },
        value: undefined,
      } as const;

      beforeEach(() => {
        requestBodySchemaValidateMock.mockReturnValueOnce(
          commonRequestBodyValidation as any,
        );
      });

      it('should validate the body', () => {
        const expected = { id: 'id' };

        underTest.use({ body: expected } as any, {} as any, () => ({}));

        expect(requestBodySchemaValidateMock).toHaveBeenCalledWith(expected, {
          abortEarly: false,
        });
      });

      describe('when the body is not valid', () => {
        it('should call the next function', () => {
          const next = jest.fn();

          underTest.use({} as any, {} as any, next);

          expect(next).toHaveBeenCalledTimes(1);
        });

        it('should log the error', () => {
          const loggerSpy = jest.spyOn(logger, 'warn');

          underTest.use({} as any, {} as any, () => ({}));

          expect(loggerSpy).toHaveBeenCalledWith(
            expect.stringContaining(commonRequestBodyValidation.error.message),
            GCPubSubMiddleware.name,
          );
        });

        it('should not replace the request body', () => {
          const expected = { id: 'id' };
          const actual = { body: { ...expected } };

          underTest.use(actual as any, {} as any, () => ({}));

          expect(actual.body).toEqual(expected);
        });
      });

      describe('when the body is valid', () => {
        const commonEventPattern = {
          data: 'some',
        } as EventPattern;

        const commonRequestBody = {
          message: {
            data: Buffer.from(JSON.stringify(commonEventPattern)).toString(
              'base64',
            ),
          },
        } as RequestBody;

        const commonBodyValidation = {
          error: undefined,
          value: commonRequestBody,
        } as const;

        beforeEach(() => {
          requestBodySchemaValidateMock
            .mockReset()
            .mockReturnValueOnce(commonBodyValidation as any);
        });

        describe('when the data is not valid JSON', () => {
          const NOT_JSON = 'not-json-like';

          beforeEach(() => {
            requestBodySchemaValidateMock.mockReset().mockReturnValueOnce({
              value: {
                message: {
                  data: Buffer.from(NOT_JSON).toString('base64'),
                },
              },
            } as any);
          });

          it('should log the error', () => {
            const loggerSpy = jest.spyOn(logger, 'warn');

            underTest.use({} as any, {} as any, () => ({}));

            expect(loggerSpy).toHaveBeenCalledWith(
              expect.stringContaining(NOT_JSON),
              GCPubSubMiddleware.name,
            );
          });
        });

        describe('when the event pattern is not valid', () => {
          const commonEventPatternValidation = {
            error: { message: 'message' },
            value: undefined,
          } as const;

          beforeEach(() => {
            eventPatternSchemaValidateMock.mockReturnValueOnce(
              commonEventPatternValidation as any,
            );
          });

          it('should call the next function', () => {
            const next = jest.fn();

            underTest.use({} as any, {} as any, next);

            expect(next).toHaveBeenCalledTimes(1);
          });

          it('should log the error', () => {
            const loggerSpy = jest.spyOn(logger, 'warn');

            underTest.use({} as any, {} as any, () => ({}));

            expect(loggerSpy).toHaveBeenCalledWith(
              expect.stringContaining(
                commonEventPatternValidation.error.message,
              ),
              GCPubSubMiddleware.name,
            );
          });

          it('should not replace the request body', () => {
            const expected = { id: 'id' };
            const actual = { body: { ...expected } };

            underTest.use(actual as any, {} as any, () => ({}));

            expect(actual.body).toEqual(expected);
          });
        });

        describe('when the event pattern is valid', () => {
          const commonEventPatternValidation = {
            error: undefined,
            value: commonEventPattern,
          } as const;

          beforeEach(() => {
            eventPatternSchemaValidateMock.mockReturnValueOnce(
              commonEventPatternValidation as any,
            );
          });

          it('should call the next function', () => {
            const next = jest.fn();

            underTest.use({} as any, {} as any, next);

            expect(next).toHaveBeenCalledTimes(1);
          });

          it('should replace the request body with the message data', () => {
            const actual = { body: {} };

            underTest.use(actual as any, {} as any, () => ({}));

            expect(actual.body).toEqual(commonEventPattern.data);
          });

          it('should log the pre-processed data', () => {
            const loggerSpy = jest.spyOn(logger, 'log');

            underTest.use({} as any, {} as any, () => ({}));

            expect(loggerSpy).toHaveBeenCalledWith(
              expect.stringContaining(JSON.stringify(commonEventPattern.data)),
              GCPubSubMiddleware.name,
            );
          });
        });
      });
    });
  });
});
