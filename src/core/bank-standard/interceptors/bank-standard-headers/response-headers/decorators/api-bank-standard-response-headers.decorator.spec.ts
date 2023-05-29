import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ResponseHeadersDto } from '../dto';
import * as underTest from './api-bank-standard-response-headers.decorator';

jest.mock('@nestjs/swagger', () => ({
  ApiExtraModels: jest.fn(),
}));

jest.mock('@nestjs/common', () => ({
  applyDecorators: jest.fn(),
}));

const mockApplyDecorators = jest.mocked(applyDecorators);
const mockApiExtraModels = jest.mocked(ApiExtraModels);

describe('ApiBankStandardResponseHeaders', () => {
  describe('when assigning extra models', () => {
    beforeEach(() => {
      underTest.ApiBankStandardResponseHeaders();
    });

    it('should call ApiExtraModels with ResponseHeadersDto', () => {
      expect(mockApiExtraModels).toHaveBeenCalledWith(ResponseHeadersDto);
    });
  });

  describe('when applying decorators', () => {
    it('should call applyDecorators with correct parameters', () => {
      const expectedApiExtraModels = 'expected_api_extra_models';

      mockApiExtraModels.mockReturnValueOnce(expectedApiExtraModels as any);

      underTest.ApiBankStandardResponseHeaders();

      expect(mockApplyDecorators).toHaveBeenCalledWith(expectedApiExtraModels);
    });
  });
});
