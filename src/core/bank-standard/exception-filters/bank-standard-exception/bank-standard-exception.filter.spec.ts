import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import {
  ArgumentsHost,
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BankStandardExceptionFilter } from './bank-standard-exception.filter';
import { ErrorSnapshotService } from './error-snapshot';

describe('BankStandardExceptionFilter', () => {
  let underTest: BankStandardExceptionFilter;
  let logger: Logger;
  let errorSnapshotService: ErrorSnapshotService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(
      BankStandardExceptionFilter,
    ).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
    errorSnapshotService = unitRef.get(ErrorSnapshotService);
  });

  describe('catch', () => {
    let host: ArgumentsHost;
    let response: Response<unknown>;

    beforeEach(() => {
      response = createMock<Response>({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      });

      host = createMock<ArgumentsHost>({
        switchToHttp: () => ({
          getResponse: () => response,
        }),
      });
    });

    it('should log the exception', () => {
      const exception = new Error('message');
      exception.stack = 'stack';

      const loggerSpy = jest.spyOn(logger, 'error');

      underTest.catch(exception, host);

      expect(loggerSpy).toHaveBeenCalledWith<Parameters<Logger['error']>>(
        exception.message,
        exception.stack,
        expect.any(String),
      );
    });

    describe.each<{ exception: Error; expectedStatus: HttpStatus }>([
      {
        exception: new Error(),
        expectedStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      {
        exception: new BadRequestException(),
        expectedStatus: HttpStatus.BAD_REQUEST,
      },
      {
        exception: new BadGatewayException(),
        expectedStatus: HttpStatus.BAD_GATEWAY,
      },
    ])('when the exception is $exception', ({ exception, expectedStatus }) => {
      it(`should set the response status to ${expectedStatus}`, () => {
        const errorSpy = jest.spyOn(response, 'status');

        underTest.catch(exception, host);

        expect(errorSpy).toHaveBeenCalledWith(expectedStatus);
      });

      it('should call the ErrorSnapshotService with the correct parameters', () => {
        const errroSnapshotServiceSpy = jest.spyOn(
          errorSnapshotService,
          'getSnapshot',
        );

        underTest.catch(exception, host);

        expect(errroSnapshotServiceSpy).toHaveBeenCalledWith<
          Parameters<ErrorSnapshotService['getSnapshot']>
        >(expectedStatus, exception);
      });

      it('should set the response body to the error snapshot', () => {
        const expected = { foo: 'bar' };

        const errorSpy = jest.spyOn(response, 'json');
        jest
          .spyOn(errorSnapshotService, 'getSnapshot')
          .mockReturnValueOnce(expected as any);

        underTest.catch(exception, host);

        expect(errorSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
