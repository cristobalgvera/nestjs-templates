import { createMock } from '@golevelup/ts-jest';
import { LoggingWinston } from '@google-cloud/logging-winston';
import { Logger, createLogger, format, transports } from 'winston';
import * as underTest from './logger.util';

jest.mock('@google-cloud/logging-winston');
jest.mock('winston', () => ({
  createLogger: jest.fn(),
  transports: createMock<typeof transports>(),
  format: createMock<typeof format>(),
}));

const mockLoggingWinston = jest.mocked(LoggingWinston);
const mockCreateLogger = jest.mocked(createLogger);
const mockTransport = jest.mocked(transports);

describe('createWinstonLogger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = createMock();

    mockCreateLogger.mockReturnValue(logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the logger', () => {
    const expected = { foo: 'bar' };

    mockCreateLogger.mockReturnValueOnce(expected as any);

    const actual = underTest.createWinstonLogger(true, {} as any);

    expect(actual).toBe(expected);
  });

  it('should create the logger with the provided metadata', () => {
    const expected = { service: 'service', extra: 'extra' };

    underTest.createWinstonLogger(true, expected as any);

    expect(mockCreateLogger).toHaveBeenCalledWith(
      expect.objectContaining<Parameters<typeof createLogger>[0]>({
        defaultMeta: expected,
      }),
    );
  });

  describe('when isProd is true', () => {
    it('should include LoggingWinston to the transports', () => {
      const expected = { foo: 'bar' };

      mockLoggingWinston.mockReturnValueOnce(expected as any);

      underTest.createWinstonLogger(true, {} as any);

      expect(mockCreateLogger).toHaveBeenCalledWith(
        expect.objectContaining<Parameters<typeof createLogger>[0]>({
          transports: expect.arrayContaining([expected]),
        }),
      );
    });
  });

  describe('when isProd is false', () => {
    it('should add transports.Console to the logger instance', () => {
      const expected = { foo: 'bar' };

      jest.spyOn(mockTransport, 'Console').mockReturnValueOnce(expected as any);

      underTest.createWinstonLogger(false, {} as any);

      expect(mockCreateLogger).toHaveBeenCalledWith(
        expect.objectContaining<Parameters<typeof createLogger>[0]>({
          transports: expect.arrayContaining([expected]),
        }),
      );
    });
  });
});
