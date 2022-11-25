import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let environmentService: EnvironmentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(createMock<ConfigService>())
      .compile();

    environmentService = module.get<EnvironmentService>(EnvironmentService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getEnvironmentValue', () => {
    it('should return the value of the environment variable', () => {
      const key = 'NODE_ENV';
      const value = 'development';

      jest.spyOn(configService, 'getOrThrow').mockReturnValue(value);

      expect(environmentService.getEnvironmentValue(key)).toEqual(value);
    });

    it('should throw an error if the environment variable is not defined', () => {
      jest.spyOn(configService, 'getOrThrow').mockImplementation(() => {
        throw new Error();
      });

      expect(() =>
        environmentService.getEnvironmentValue('NODE_ENV'),
      ).toThrow();
    });
  });

  describe('isProd', () => {
    it('should return true if the environment variable is "production"', () => {
      const value = 'production';

      jest.spyOn(configService, 'getOrThrow').mockReturnValue(value);

      expect(environmentService.isProd).toEqual(true);
    });

    it('should return false if the environment variable is not "production"', () => {
      const value = 'development';

      jest.spyOn(configService, 'getOrThrow').mockReturnValue(value);

      expect(environmentService.isProd).toEqual(false);
    });
  });

  describe('isSwaggerEnabled', () => {
    it('should return true if the environment variable is "true"', () => {
      const expected = true;

      jest.spyOn(configService, 'getOrThrow').mockReturnValue(expected);

      expect(environmentService.isSwaggerEnabled).toEqual(expected);
    });

    it('should return false if the environment variable is not "true"', () => {
      jest.spyOn(configService, 'getOrThrow').mockReturnValue(false);

      expect(environmentService.isSwaggerEnabled).toEqual(false);
    });
  });
});
