import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';
import { TestBed } from '@automock/jest';
import { CanonicalErrorType } from './types';

describe('ErrorSnapshotHelperService', () => {
  let underTest: ErrorSnapshotHelperService;

  beforeEach(() => {
    const { unit } = TestBed.create(ErrorSnapshotHelperService).compile();

    underTest = unit;
  });

  describe('getCode', () => {
    describe.each<{ httpStatus: HttpStatus; expected: string }>([
      { httpStatus: HttpStatus.BAD_GATEWAY, expected: 'BAD_GATEWAY' },
      { httpStatus: HttpStatus.BAD_REQUEST, expected: 'BAD_REQUEST' },
      { httpStatus: HttpStatus.CONFLICT, expected: 'CONFLICT' },
    ])('when the HTTP status is $httpStatus', ({ httpStatus, expected }) => {
      it(`should return ${expected}`, () => {
        const actual = underTest.getCode(httpStatus);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getDescription', () => {
    describe.each<{ exception: Error; expected: string }>([
      { exception: new Error('message'), expected: 'message' },
      { exception: new BadRequestException('message'), expected: 'message' },
    ])(
      'when the exception is $exception and does not have a response object',
      ({ exception, expected }) => {
        it(`should return ${expected}`, () => {
          const actual = underTest.getDescription(exception);

          expect(actual).toEqual(expected);
        });
      },
    );

    describe('when HttpException has a message field in the response object', () => {
      it('should return the message', () => {
        const exception = new BadRequestException();
        exception.getResponse = () => ({ message: 'expected' });

        const actual = underTest.getDescription(exception);

        expect(actual).toMatchInlineSnapshot(`"expected"`);
      });
    });
  });

  describe('getType', () => {
    describe('when the exception is not a HttpException', () => {
      it('should return TEC', () => {
        const actual = underTest.getType('http_status' as any, new Error());

        expect(actual).toBe('TEC');
      });
    });

    describe('when the exception is a HttpException', () => {
      describe.each<{ httpStatus: HttpStatus; expected: CanonicalErrorType }>([
        { httpStatus: HttpStatus.UNAUTHORIZED, expected: 'SEG' },
        { httpStatus: HttpStatus.FORBIDDEN, expected: 'SEG' },
        { httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, expected: 'NEG' },
        { httpStatus: HttpStatus.BAD_REQUEST, expected: 'TEC' },
      ])('when the HTTP status is $httpStatus', ({ httpStatus, expected }) => {
        it(`should return ${expected}`, () => {
          const actual = underTest.getType(
            httpStatus,
            new BadRequestException(),
          );

          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
