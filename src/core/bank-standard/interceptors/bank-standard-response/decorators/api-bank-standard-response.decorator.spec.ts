import {
  DEFAULT_HTTP_STATUS,
  SERVICE_DOMAIN_NAME_CODE,
} from '@core/bank-standard/constants';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { getBankStandardResponseHeaders } from '../../bank-standard-headers';
import { ResultDto } from '../dto';
import * as underTest from './api-bank-standard-response.decorator';

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  applyDecorators: jest.fn(),
}));
jest.mock('@nestjs/swagger');
jest.mock('../../bank-standard-headers');

const mockApplyDecorators = jest.mocked(applyDecorators);
const mockApiExtraModels = jest.mocked(ApiExtraModels);
const mockApiResponse = jest.mocked(ApiResponse);
const mockGetSchemaPath = jest.mocked(getSchemaPath);
const mockGetBankStandardResponseHeaders = jest.mocked(
  getBankStandardResponseHeaders,
);

describe('ApiBankStandardResponse', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when assigning extra models', () => {
    let expectedModel: unknown;

    describe('when the provided model is defined', () => {
      beforeEach(() => {
        expectedModel = { foo: 'bar' };

        underTest.ApiBankStandardResponse(expectedModel as any);
      });

      it('should call ApiExtraModels with ResultDto', () => {
        expect(mockApiExtraModels).toHaveBeenCalledWith(ResultDto);
      });

      it('should call ApiExtraModels with the provided model', () => {
        expect(mockApiExtraModels).toHaveBeenCalledWith(expectedModel);
      });
    });

    describe('when the provided model is undefined', () => {
      beforeEach(() => {
        underTest.ApiBankStandardResponse();
      });

      it('should call ApiExtraModels with ResultDto instead of the provided model', () => {
        expect(mockApiExtraModels).toHaveBeenNthCalledWith(2, ResultDto);
      });
    });
  });

  describe('when assigning the API response', () => {
    describe('when assigning the status', () => {
      describe('when the status is provided', () => {
        it('should call ApiResponse with the provided status', () => {
          const expected = 'expected';

          underTest.ApiBankStandardResponse({} as any, {
            status: expected as any,
          });

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              status: expected as any,
            }),
          );
        });
      });

      describe('when the status is not provided', () => {
        it('should call ApiResponse with the default status', () => {
          underTest.ApiBankStandardResponse({} as any);

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              status: DEFAULT_HTTP_STATUS,
            }),
          );
        });
      });
    });

    describe('when assigning the description', () => {
      it.each(['expected', undefined])(
        'should call ApiResponse with the description: %s',
        (expected) => {
          underTest.ApiBankStandardResponse({} as any, {
            description: expected as any,
          });

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              description: expected as any,
            }),
          );
        },
      );
    });

    describe('when assigning the schema', () => {
      const MODEL_REF = 'model_ref';
      const RESULT_DTO_REF = 'result_dto_ref';

      beforeEach(() => {
        mockGetSchemaPath.mockImplementation((model) => {
          if (model instanceof Function) return RESULT_DTO_REF;

          return MODEL_REF;
        });
      });

      describe.each([{}, undefined])('when the model is %p', (model) => {
        it('should call ApiResponse with the base schema', () => {
          underTest.ApiBankStandardResponse(model as any);

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              schema: {
                properties: expect.objectContaining({
                  Result: { $ref: RESULT_DTO_REF },
                }),
              },
            }),
          );
        });
      });

      describe('when the model is undefined', () => {
        it('should not contain the object schema', () => {
          underTest.ApiBankStandardResponse();

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              schema: expect.objectContaining({
                properties: expect.not.objectContaining({
                  [`Response${SERVICE_DOMAIN_NAME_CODE}`]: expect.anything(),
                }),
              }),
            }),
          );
        });
      });

      describe('when the model is not an array', () => {
        it('should call ApiResponse with the object schema', () => {
          underTest.ApiBankStandardResponse({} as any);

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              schema: expect.objectContaining({
                properties: expect.objectContaining({
                  [`Response${SERVICE_DOMAIN_NAME_CODE}`]: {
                    $ref: MODEL_REF,
                  },
                }),
              }),
            }),
          );
        });
      });

      describe('when the model is an array', () => {
        it('should call ApiResponse with the array schema', () => {
          underTest.ApiBankStandardResponse({} as any, {
            isArray: true,
          });

          expect(mockApiResponse).toHaveBeenCalledWith(
            expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
              schema: expect.objectContaining({
                properties: expect.objectContaining({
                  [`Response${SERVICE_DOMAIN_NAME_CODE}`]: {
                    type: 'array',
                    items: { $ref: MODEL_REF },
                  },
                }),
              }),
            }),
          );
        });
      });
    });

    describe('when assigning the headers', () => {
      it('should call ApiResponse with the headers', () => {
        const expected = { foo: 'bar' };

        mockGetBankStandardResponseHeaders.mockReturnValueOnce(expected as any);

        underTest.ApiBankStandardResponse({} as any);

        expect(mockApiResponse).toHaveBeenCalledWith(
          expect.objectContaining<Parameters<typeof ApiResponse>[0]>({
            headers: expected as any,
          }),
        );
      });
    });
  });

  describe('when applying the decorators', () => {
    it('should call applyDecorators with the correct parameters', () => {
      const expectedExtraModel1 = 'expected_extra_model_1';
      const expectedExtraModel2 = 'expected_extra_model_2';
      const expectedApiResponse = 'expected_api_response_1';

      mockApiExtraModels
        .mockReturnValueOnce(expectedExtraModel1 as any)
        .mockReturnValueOnce(expectedExtraModel2 as any);

      mockApiResponse.mockReturnValueOnce(expectedApiResponse as any);

      underTest.ApiBankStandardResponse({} as any);

      expect(mockApplyDecorators).toHaveBeenCalledWith(
        expectedExtraModel1,
        expectedExtraModel2,
        expectedApiResponse,
      );
    });

    it('should return the result of applyDecorators', () => {
      mockApplyDecorators.mockReturnValueOnce('expected' as any);

      const actual = underTest.ApiBankStandardResponse({} as any);

      expect(actual).toMatchInlineSnapshot(`"expected"`);
    });
  });
});
