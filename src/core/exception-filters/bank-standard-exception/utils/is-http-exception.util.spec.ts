import { BadGatewayException } from '@nestjs/common';
import { isHttpException } from './is-http-exception.util';

describe('isHttpException', () => {
  describe('when the exception is instance of HttpException', () => {
    it('should return true', () => {
      const actual = isHttpException(new BadGatewayException());
      expect(actual).toBe(true);
    });
  });

  describe('when the exception is not instance of HttpException', () => {
    it('should return false', () => {
      const actual = isHttpException(new Error());
      expect(actual).toBe(false);
    });
  });
});
