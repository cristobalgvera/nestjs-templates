import { TestBed } from '@automock/jest';
import { ConfigService } from '@nestjs/config';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let underTest: EnvironmentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(EnvironmentService).compile();

    underTest = unit;
    configService = unitRef.get(ConfigService);
  });

  describe('get', () => {
    describe('when the variable is defined', () => {
      it('should return the value', () => {
        const key = 'NODE_ENV';
        const value = 'development';

        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(value);

        expect(underTest.get(key)).toEqual(value);
      });
    });

    describe('when the variable is not defined', () => {
      it('should throw an error', () => {
        jest.spyOn(configService, 'getOrThrow').mockImplementationOnce(() => {
          throw new Error();
        });

        expect(() => underTest.get('NODE_ENV')).toThrow();
      });
    });
  });

  describe('isProd', () => {
    describe('when the environment variable is "production"', () => {
      it('should return true', () => {
        const value = 'production';

        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(value);

        const actual = underTest.isProd();

        expect(actual).toBe(true);
      });
    });

    describe('when the environment variable is not "production"', () => {
      it('should return false', () => {
        const value = 'development';

        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(value);

        const actual = underTest.isProd();

        expect(actual).toBe(false);
      });
    });
  });

  describe('isSwaggerEnabled', () => {
    describe('when the environment variable is "true"', () => {
      it('should return true', () => {
        const expected = true;

        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(expected);

        const actual = underTest.isSwaggerEnabled();

        expect(actual).toEqual(expected);
      });
    });

    describe('when the environment variable is not "true"', () => {
      it('should return false', () => {
        jest.spyOn(configService, 'getOrThrow').mockReturnValueOnce(false);

        const actual = underTest.isSwaggerEnabled();

        expect(actual).toBe(false);
      });
    });
  });
});
