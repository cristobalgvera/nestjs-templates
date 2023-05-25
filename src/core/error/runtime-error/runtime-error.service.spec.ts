import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import { RuntimeErrorService } from './runtime-error.service';
import { createMock } from '@golevelup/ts-jest';

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  Logger: jest.fn(),
}));

const loggerMock = jest.mocked(Logger);

describe('RuntimeErrorService', () => {
  let underTest: RuntimeErrorService;
  let logger: Logger;

  beforeEach(() => {
    logger = createMock<Logger>();
    loggerMock.mockImplementationOnce(() => logger);

    const { unit } = TestBed.create(RuntimeErrorService).compile();

    underTest = unit;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleError', () => {
    describe.each<{ method: unknown; caller: unknown }>([
      { method: () => ({}), caller: {} },
      { method: undefined, caller: {} },
      { method: () => ({}), caller: undefined },
    ])('when logging the error with %p', ({ caller, method }) => {
      it('should log the error', () => {
        const loggerSpy = jest.spyOn(logger, 'error');

        try {
          underTest.handleError({
            error: {},
            method,
            caller,
          } as any);
        } catch (error) {
          // Ignore error
        } finally {
          expect(loggerSpy).toHaveBeenCalledTimes(1);
        }
      });
    });

    describe('when throwing the error', () => {
      it('should throw the same error provided', () => {
        const expected = new Error('error');

        expect(() =>
          underTest.handleError({
            error: expected,
            caller: RuntimeErrorService,
            method: () => ({}),
          }),
        ).toThrow(expected);
      });
    });
  });
});
