import { TestBed } from '@automock/jest';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { CanonicalErrorType } from './constants';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';

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
    ])('when the exception is $exception', ({ exception, expected }) => {
      it(`should return ${expected}`, () => {
        const actual = underTest.getDescription(exception);

        expect(actual).toEqual(expected);
      });
    });

    describe.each<{ message: unknown; expected: unknown }>([
      { message: 'expected', expected: 'expected' },
      {
        message: ['expected_1', 'expected_2'],
        expected: ['expected_1', 'expected_2'],
      },
      { message: 1234, expected: 'Bad Request' },
      { message: undefined, expected: 'Bad Request' },
    ])(
      'when the exception is HttpException with message $message',
      ({ message, expected }) => {
        it(`should return ${expected}`, () => {
          const exception = new BadRequestException();
          exception.getResponse = () => ({ message });

          const actual = underTest.getDescription(exception);

          expect(actual).toEqual(expected);
        });
      },
    );
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
