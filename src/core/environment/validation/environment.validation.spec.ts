import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';
import { Environment } from '../environment.type';
import { environmentSchema } from './environment.schema';
import { validateEnvironment } from './environment.validation';

jest.mock('./environment.schema', () => ({
  environmentSchema: {
    validate: jest.fn(),
  },
}));

jest.mock('class-transformer', () => ({
  plainToInstance: jest.fn(),
}));

jest.mock('../environment.type', () => ({
  Environment: jest.fn(),
}));

const validateSchemaMock = jest.mocked(environmentSchema.validate);
const plainToInstanceMock = jest.mocked(plainToInstance);

describe('EnvironmentValidation', () => {
  describe('validateEnvironment', () => {
    let transformedEnvironment: Environment;

    beforeEach(() => {
      transformedEnvironment = { id: 'id' } as any;

      plainToInstanceMock.mockReturnValueOnce(transformedEnvironment);
      validateSchemaMock.mockReturnValueOnce({ error: undefined } as any);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should transform the configuration to an environment', () => {
      const expected = { config: 'config' };

      validateEnvironment(expected as any);

      expect(plainToInstanceMock).toHaveBeenCalledWith(Environment, expected);
    });

    it('should validate the transformed configuration against the schema', () => {
      const expected = { config: 'config' };

      plainToInstanceMock.mockReset().mockReturnValueOnce(expected);

      validateEnvironment({} as any);

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
        const expected = { ...transformedEnvironment };

        validateSchemaMock.mockReset().mockReturnValueOnce({
          error: undefined,
          value: expected,
        } as any);

        const actual = validateEnvironment({} as any);

        expect(actual).toEqual(expected);
      });
    });

    describe('when the configuration is invalid', () => {
      it('should throw an error', () => {
        expect.hasAssertions();

        const expected = 'message';

        validateSchemaMock.mockReset().mockReturnValueOnce({
          error: { message: expected },
          value: undefined,
        } as any);

        expect(() => validateEnvironment({} as any)).toThrow(expected);
      });
    });
  });
});
