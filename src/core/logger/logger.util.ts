import { LoggingWinston } from '@google-cloud/logging-winston';
import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

type DefaultMeta = Readonly<{ service: string } & Record<string, unknown>>;

export function createCustomLogger(
  isProd: boolean,
  defaultMeta: DefaultMeta,
): LoggerService {
  const transport = isProd
    ? new LoggingWinston()
    : new transports.Console({ format: format.simple() });

  return WinstonModule.createLogger({
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
