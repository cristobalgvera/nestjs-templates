import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { CallHandler, Logger } from '@nestjs/common';
import { firstValueFrom, of, throwError } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let underTest: ErrorInterceptor;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ErrorInterceptor).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('intercept', () => {
    let next: CallHandler;

    beforeEach(() => {
      next = createMock<CallHandler>();
    });

    describe('when the controller throws an error', () => {
      it('should catch the error', async () => {
        const error = new Error('error');

        jest.spyOn(next, 'handle').mockReturnValueOnce(throwError(() => error));

        const actual = await firstValueFrom(
          underTest.intercept({} as any, next),
        );

        expect(actual).toMatchInlineSnapshot(`
          {
            "error": "Error",
            "message": "error",
            "status": "Error",
          }
        `);
      });

      it('should log the error', async () => {
        jest
          .spyOn(next, 'handle')
          .mockReturnValueOnce(throwError(() => new Error()));

        const loggerSpy = jest.spyOn(logger, 'warn');

        await firstValueFrom(underTest.intercept({} as any, next));

        expect(loggerSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when the controller does not throw an error', () => {
      it('should return the response', async () => {
        const response = { id: 'id' };

        jest.spyOn(next, 'handle').mockReturnValueOnce(of(response as any));

        const actual = await firstValueFrom(
          underTest.intercept({} as any, next),
        );

        expect(actual).toEqual(response);
      });

      it('should not log the error', async () => {
        jest.spyOn(next, 'handle').mockReturnValueOnce(of({} as any));

        const loggerSpy = jest.spyOn(logger, 'warn');

        await firstValueFrom(underTest.intercept({} as any, next));

        expect(loggerSpy).not.toHaveBeenCalled();
      });
    });
  });
});
