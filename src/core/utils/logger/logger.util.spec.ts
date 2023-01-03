import { LoggingWinston } from '@google-cloud/logging-winston';
import { createLogger, transports } from 'winston';
import { getLogger } from './logger.util';

const loggerMock = {
  add: jest.fn(),
};

jest.mock('@google-cloud/logging-winston', () => ({
  LoggingWinston: jest.fn(),
}));

jest.mock('winston', () => ({
  createLogger: jest.fn().mockImplementation(() => loggerMock),
  transports: {
    Console: jest.fn().mockImplementation(() => ({})),
  },
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
  },
}));

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLogger', () => {
    it('should create a logger with the provided metadata', () => {
      const expected = { service: 'service', extra: 'extra' };

      getLogger(true, expected as any);

      expect(createLogger).toHaveBeenCalledWith(
        expect.objectContaining({ defaultMeta: expected }),
      );
    });

    describe('when isProd is true', () => {
      it('should add LoggingWinston to logger instance', () => {
        expect.assertions(2);

        getLogger(true, {} as any);

        expect(LoggingWinston).toHaveBeenCalledTimes(1);
        expect(loggerMock.add).toHaveBeenCalledTimes(1);
      });
    });

    describe('when isProd is false', () => {
      it('should add Console to logger instance', () => {
        expect.assertions(2);

        getLogger(false, {} as any);

        expect(transports.Console).toHaveBeenCalledTimes(1);
        expect(loggerMock.add).toHaveBeenCalledTimes(1);
      });
    });
  });
});
