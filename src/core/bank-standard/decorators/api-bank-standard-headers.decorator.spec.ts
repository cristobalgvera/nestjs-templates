import { applyDecorators } from '@nestjs/common';
import {
  ApiBankStandardRequestHeaders,
  ApiBankStandardResponseHeaders,
} from '../interceptors';
import * as underTest from './api-bank-standard-headers.decorator';

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

describe('ApiBankStandardHeaders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when applying the decorators', () => {
    it('should call applyDecorators with the expected decorators', () => {
      const expectedRequestHeaders = 'expected_request_headers';
      const expectedResponseHeaders = 'expected_response_headers';

      mockApiBankStandardRequestHeaders.mockReturnValueOnce(
        expectedRequestHeaders as any,
      );
      mockApiBankStandardResponseHeaders.mockReturnValueOnce(
        expectedResponseHeaders as any,
      );

      underTest.ApiBankStandardHeaders();

      expect(mockApplyDecorators).toHaveBeenCalledWith(
        expectedRequestHeaders,
        expectedResponseHeaders,
      );
    });
  });
});
