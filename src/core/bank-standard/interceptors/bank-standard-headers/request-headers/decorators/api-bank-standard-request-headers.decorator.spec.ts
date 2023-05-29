import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiHeaders } from '@nestjs/swagger';
import { BankStandardRequestHeadersDto } from '../dto';
import { BankStandardHeadersOptions } from './api-bank-standard-headers-options.dto';
import * as underTest from './api-bank-standard-request-headers.decorator';

jest.mock('@nestjs/swagger', () => ({
  ApiExtraModels: jest.fn(),
  ApiHeaders: jest.fn(),
}));

jest.mock('@nestjs/common', () => ({
  applyDecorators: jest.fn(),
}));

const mockApplyDecorators = jest.mocked(applyDecorators);
const mockApiExtraModels = jest.mocked(ApiExtraModels);
const mockApiHeaders = jest.mocked(ApiHeaders);

describe('ApiBankStandardRequestHeaders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when assigning extra models', () => {
    beforeEach(() => {
      underTest.ApiBankStandardRequestHeaders();
    });

    it('should call ApiExtraModels with correct parameters', () => {
      expect(mockApiExtraModels).toHaveBeenCalledWith(
        BankStandardRequestHeadersDto,
      );
    });
  });

  describe('when assigning the API headers', () => {
    beforeEach(() => {
      underTest.ApiBankStandardRequestHeaders();
    });

    it.each<BankStandardHeadersOptions>([
      { name: 'consumer-sys-code', required: true },
      { name: 'consumer-enterprise-code', required: true },
      { name: 'consumer-country-code', required: true },
      { name: 'trace-client-req-timestamp', schema: { format: 'date' } },
      { name: 'trace-event-id' },
      { name: 'trace-source-id' },
      { name: 'channel-name' },
      { name: 'channel-mode' },
    ])('should call ApiHeaders with %p', (options) => {
      expect(mockApiHeaders).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining(options)]),
      );
    });
  });

  describe('when applying the decorators', () => {
    it('should call applyDecorators with correct parameters', () => {
      const expectedApiExtraModels = 'foo';
      const expectedApiHeaders = 'bar';

      mockApiExtraModels.mockReturnValueOnce(expectedApiExtraModels as any);
      mockApiHeaders.mockReturnValueOnce(expectedApiHeaders as any);

      underTest.ApiBankStandardRequestHeaders();

      expect(mockApplyDecorators).toHaveBeenCalledWith(
        expectedApiExtraModels,
        expectedApiHeaders,
      );
    });
  });
});
