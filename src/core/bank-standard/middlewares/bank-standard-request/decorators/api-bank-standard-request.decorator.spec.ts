import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import * as underTest from './api-bank-standard-request.decorator';

jest.mock('@nestjs/swagger');
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  applyDecorators: jest.fn(),
}));

const mockApplyDecorators = jest.mocked(applyDecorators);
const mockApiBody = jest.mocked(ApiBody);
const mockApiExtraModels = jest.mocked(ApiExtraModels);
const mockGetSchemaPath = jest.mocked(getSchemaPath);

describe('ApiBankStandardRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when applying extra models', () => {
    it('should call ApiExtraModels using the provided type', () => {
      const expected = { foo: 'bar' };

      underTest.ApiBankStandardRequest(expected as any);

      expect(mockApiExtraModels).toHaveBeenCalledWith(expected);
    });
  });

  describe('when applying the ApiBody decorator', () => {
    const SCHEMA_PATH = 'foo';

    beforeEach(() => {
      mockGetSchemaPath.mockReturnValue(SCHEMA_PATH);
    });

    it('should call ApiBody with the provided description', () => {
      const expected = 'foo';

      underTest.ApiBankStandardRequest({} as any, { description: expected });

      expect(mockApiBody).toHaveBeenCalledWith(
        expect.objectContaining<Parameters<typeof ApiBody>[0]>({
          description: expected,
        }),
      );
    });

    describe('when the provided type is an array', () => {
      it('should call ApiBody with the array schema', () => {
        underTest.ApiBankStandardRequest({} as any, { isArray: true });

        expect(mockApiBody).toHaveBeenCalledWith(
          expect.objectContaining<Parameters<typeof ApiBody>[0]>({
            schema: {
              properties: {
                [`Request${SERVICE_DOMAIN_NAME_CODE}`]: {
                  type: 'array',
                  items: { $ref: SCHEMA_PATH },
                },
              },
            },
          }),
        );
      });
    });

    describe('when the provided type is not an array', () => {
      it('should call ApiBody with the object schema', () => {
        underTest.ApiBankStandardRequest({} as any);

        expect(mockApiBody).toHaveBeenCalledWith(
          expect.objectContaining<Parameters<typeof ApiBody>[0]>({
            schema: {
              properties: {
                [`Request${SERVICE_DOMAIN_NAME_CODE}`]: {
                  $ref: SCHEMA_PATH,
                },
              },
            },
          }),
        );
      });
    });
  });

  describe('when applying the applyDecorators decorator', () => {
    it('should call applyDecorators with correct parameters', () => {
      const expectedExtraModels = 'expected_extra_model';
      const expectedApiBody = 'expected_api_body';

      mockApiExtraModels.mockReturnValueOnce(expectedExtraModels as any);
      mockApiBody.mockReturnValueOnce(expectedApiBody as any);

      underTest.ApiBankStandardRequest({} as any);

      expect(mockApplyDecorators).toHaveBeenCalledWith(
        expectedExtraModels,
        expectedApiBody,
      );
    });
  });
});
