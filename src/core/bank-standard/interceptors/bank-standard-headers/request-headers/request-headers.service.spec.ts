import { TestBed } from '@automock/jest';
import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';
import {
  BankStandardRequestHeadersDto,
  bankStandardRequestHeadersSchema,
} from './dto';
import { RequestHeadersService } from './request-headers.service';

jest.mock('class-transformer', () => ({
  ...jest.requireActual('class-transformer'),
  plainToInstance: jest.fn(),
}));

jest.mock('./dto', () => ({
  ...jest.requireActual('./dto'),
  bankStandardRequestHeadersSchema: {
    validate: jest.fn(),
  },
}));

const plainToInstanceMock = jest.mocked(plainToInstance);
const validateSchemaMock = jest.mocked(
  bankStandardRequestHeadersSchema.validate,
);

describe('RequestHeadersService', () => {
  let underTest: RequestHeadersService;

  beforeEach(() => {
    const { unit } = TestBed.create(RequestHeadersService).compile();

    underTest = unit;
  });

  describe('validateHeaders', () => {
    let transformedBankStandardRequestHeadersDto: BankStandardRequestHeadersDto;

    beforeEach(() => {
      transformedBankStandardRequestHeadersDto = { id: 'id' } as any;

      validateSchemaMock.mockReturnValue({ error: undefined } as any);
      plainToInstanceMock.mockReturnValue(
        transformedBankStandardRequestHeadersDto,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should transform the configuration to an environment', () => {
      const expected = { config: 'config' };

      underTest.validateHeaders(expected as any);

      expect(plainToInstanceMock).toHaveBeenCalledWith<
        Parameters<typeof plainToInstance>
      >(BankStandardRequestHeadersDto, expected, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    });

    it('should validate the transformed configuration against the schema', () => {
      const expected = { config: 'config' };

      plainToInstanceMock.mockReturnValueOnce(expected);

      underTest.validateHeaders({} as any);

      expect(validateSchemaMock).toHaveBeenCalledWith(
        expected,
        expect.objectContaining<Joi.ValidationOptions>({
          allowUnknown: true,
          abortEarly: false,
        }),
      );
    });

    describe('when the configuration is valid', () => {
      it('should return the validated configuration', () => {
        const expected = { ...transformedBankStandardRequestHeadersDto };

        validateSchemaMock.mockReturnValueOnce({
          error: undefined,
          value: expected,
        } as any);

        const actual = underTest.validateHeaders({} as any);

        expect(actual).toEqual(expected);
      });
    });

    describe('when the configuration is invalid', () => {
      it('should throw an error', () => {
        expect.hasAssertions();

        const expected = 'message';

        validateSchemaMock.mockReturnValueOnce({
          error: { message: expected },
          value: undefined,
        } as any);

        expect(() => underTest.validateHeaders({} as any)).toThrow(expected);
      });
    });
  });
});
