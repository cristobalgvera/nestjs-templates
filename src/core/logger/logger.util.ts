import { LoggingWinston } from '@google-cloud/logging-winston';
import { createLogger, format, Logger, transports } from 'winston';

type DefaultMeta = Readonly<{ service: string } & Record<string, unknown>>;

export function createWinstonLogger(
  isProd: boolean,
  defaultMeta: DefaultMeta,
): Logger {
  const transport = isProd
    ? new LoggingWinston()
    : new transports.Console({ format: format.simple() });

  return createLogger({
    defaultMeta,
    transports: [transport],
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.colorize({ all: true }),
      format.json(),
    ),
  });
}
