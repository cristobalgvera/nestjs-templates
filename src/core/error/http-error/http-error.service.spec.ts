import { TestBed } from '@automock/jest';
import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpErrorService } from './http-error.service';

describe('HttpErrorService', () => {
  let underTest: HttpErrorService;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(HttpErrorService).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
  });

  describe('handleError', () => {
    describe('when the error is not an AxiosError', () => {
      it('should throw an error', async () => {
        expect.hasAssertions();

        const error = new Error();

        try {
          await firstValueFrom(
            underTest.handleError({
              error: error as any,
              caller: 'caller' as any,
              methodName: 'method',
            }),
          );
        } catch (actual) {
          expect(actual).toMatchInlineSnapshot(
            `[Error: Invalid error type. Expected AxiosError]`,
          );
        }
      });
    });

    describe('when the error is an AxiosError', () => {
      it('should log the error', async () => {
        expect.hasAssertions();

        const expectedError = new AxiosError(
          'message',
          undefined,
          undefined,
          undefined,
          { data: 'data' } as any,
        );

        const expectedCaller = HttpErrorService;
        const expectedMethod = 'method';

        const loggerSpy = jest.spyOn(logger, 'error');

        try {
          await firstValueFrom(
            underTest.handleError({
              error: expectedError as any,
              caller: expectedCaller,
              methodName: expectedMethod,
            }),
          );
        } catch (error) {
          expect(loggerSpy).toHaveBeenCalledWith(
            `[${expectedCaller.name}: ${expectedMethod}] ${expectedError.message}`,
            expectedError.response?.data,
          );
        }
      });

      describe('when throwing the http error', () => {
        let actual: HttpException;
        let expectedMessage: string;
        let error: AxiosError;

        function createAxiosError(
          response: Partial<AxiosResponse>,
        ): AxiosError {
          return new AxiosError(
            'message',
            'code',
            undefined,
            undefined,
            response as AxiosResponse,
          );
        }

        type CreateTestScenarioOptions = {
          customError?: AxiosError;
          customMessage?: string;
        };

        async function createTestScenario(
          statusCode: number | undefined,
          { customError, customMessage }: CreateTestScenarioOptions = {},
        ) {
          expectedMessage = customMessage ?? 'message';

          error =
            customError ??
            createAxiosError({
              status: statusCode,
              data: expectedMessage,
            });

          try {
            await firstValueFrom(
              underTest.handleError({
                error,
                caller: 'caller' as any,
                methodName: 'method',
              }),
            );
          } catch (error) {
            actual = error;
          }
        }

        describe.each([
          {
            statusCode: HttpStatus.BAD_REQUEST,
            expected: BadRequestException,
          },
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            expected: UnauthorizedException,
          },
          {
            statusCode: HttpStatus.NOT_FOUND,
            expected: NotFoundException,
          },
          {
            statusCode: HttpStatus.CONFLICT,
            expected: ConflictException,
          },
          {
            statusCode: HttpStatus.PRECONDITION_FAILED,
            expected: PreconditionFailedException,
          },
        ])('when error status is $statusCode', ({ statusCode, expected }) => {
          beforeEach(async () => {
            await createTestScenario(statusCode);
          });

          it('should throw the proper exception', () => {
            expect(actual).toBeInstanceOf(expected);
          });

          it('should throw with the same message', () => {
            expect(actual.message).toEqual(expectedMessage);
          });
        });

        describe.each([HttpStatus.PAYMENT_REQUIRED])(
          'when error status is %s',
          (statusCode) => {
            beforeEach(async () => {
              await createTestScenario(statusCode);
            });

            it('should throw HttpException', () => {
              expect(actual).toBeInstanceOf(HttpException);
            });

            it('should throw with the same message', () => {
              expect(actual.message).toEqual(expectedMessage);
            });

            it('should throw with the same code', () => {
              expect(actual.getStatus()).toEqual(statusCode);
            });
          },
        );

        describe('when the error status is not handled yet', () => {
          beforeEach(async () => {
            const NOT_HANDLED_CODE = -1;
            const customMessage = 'message';
            const customError = createAxiosError({
              status: NOT_HANDLED_CODE,
              data: customMessage,
            });

            await createTestScenario(NOT_HANDLED_CODE, {
              customError,
              customMessage,
            });
          });

          it('should throw BadGatewayException', () => {
            expect(actual).toBeInstanceOf(BadGatewayException);
          });

          it('should throw with the same message', () => {
            expect(actual.message).toEqual(expectedMessage);
          });
        });

        describe('when the error status is not defined', () => {
          beforeEach(async () => {
            const customMessage = 'message';
            const customError = new AxiosError(customMessage);

            await createTestScenario(undefined, {
              customError,
              customMessage,
            });
          });

          it('should throw BadGatewayException with the same message', () => {
            expect(actual).toBeInstanceOf(BadGatewayException);
          });

          it('should throw with the same message', () => {
            expect(actual.message).toEqual(expectedMessage);
          });
        });
      });
    });
  });
});
