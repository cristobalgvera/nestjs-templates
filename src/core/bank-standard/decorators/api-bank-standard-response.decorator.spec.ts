import { applyDecorators } from '@nestjs/common';
import {
  ApiBankStandardRequestHeaders,
  ApiBankStandardResponseHeaders,
  ApiBankStandardSuccessResponse,
} from '../interceptors';
import * as underTest from './api-bank-standard-response.decorator';

jest.mock('../interceptors');
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  applyDecorators: jest.fn(),
}));

const mockApplyDecorators = jest.mocked(applyDecorators);
const mockApiBankStandardRequestHeaders = jest.mocked(
  ApiBankStandardRequestHeaders,
);
const mockApiBankStandardResponseHeaders = jest.mocked(
  ApiBankStandardResponseHeaders,
);
const mockApiBankStandardSuccessResponse = jest.mocked(
  ApiBankStandardSuccessResponse,
);

describe('ApiBankStandardResponse', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when setting the ApiBankStandardSuccessResponse options', () => {
    it('should call it using the provided options', () => {
      const expectedType = 'expected_type';
      const expectedOptions = { foo: 'bar' };

      underTest.ApiBankStandardResponse(
        expectedType as any,
        expectedOptions as any,
      );

      expect(mockApiBankStandardSuccessResponse).toHaveBeenCalledWith(
        expectedType,
        expectedOptions,
      );
    });
  });

  describe('when applying the decorators', () => {
    it('should call applyDecorators with the expected decorators', () => {
      const expectedRequestHeaders = 'expected_request_headers';
      const expectedResponseHeaders = 'expected_response_headers';
      const expectedSuccessResponse = 'expected_success_response';

      mockApiBankStandardRequestHeaders.mockReturnValueOnce(
        expectedRequestHeaders as any,
      );
      mockApiBankStandardResponseHeaders.mockReturnValueOnce(
        expectedResponseHeaders as any,
      );
      mockApiBankStandardSuccessResponse.mockReturnValueOnce(
        expectedSuccessResponse as any,
      );

      underTest.ApiBankStandardResponse({} as any);

      expect(mockApplyDecorators).toHaveBeenCalledWith(
        expectedRequestHeaders,
        expectedResponseHeaders,
        expectedSuccessResponse,
      );
    });
  });
});
