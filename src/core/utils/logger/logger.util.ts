import { LoggingWinston } from '@google-cloud/logging-winston';
import { createLogger, format, Logger, transports } from 'winston';

type DefaultMeta = {
  service: string;
  [metadata: string]: unknown;
};

export function getLogger(isProd: boolean, defaultMeta: DefaultMeta): Logger {
  const loggerInstance = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.json(),
      format.colorize({ all: true }),
    ),
    defaultMeta,
  });

  if (isProd) {
    loggerInstance.add(new LoggingWinston());
  } else {
    loggerInstance.add(
      new transports.Console({
        format: format.combine(format.simple()),
      }),
    );
  }

  return loggerInstance;
}
