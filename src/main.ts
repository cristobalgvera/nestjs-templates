import { EnvironmentService } from '@core/environment';
import { createCustomLogger } from '@core/logger';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Add proper global prefix
  app.setGlobalPrefix('SERVICE_PREFIX');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const environmentService = app.get(EnvironmentService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useLogger(
    createCustomLogger(environmentService.isProd(), {
      // TODO: Add proper service name
      service: 'SERVICE_NAME',
    }),
  );

  if (environmentService.get('IS_SWAGGER_ENABLED')) enableSwagger(app);

  const logger = app.get(Logger);
  const port = environmentService.get('PORT');

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`);
  });
}

function enableSwagger(app: INestApplication) {
  const SWAGGER_PATH = 'api-doc';

  const config = new DocumentBuilder()
    // TODO: Add proper service name
    .setTitle('SERVICE_NAME')
    .setExternalDoc('Postman collection', `${SWAGGER_PATH}-json`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PATH, app, document);
}

bootstrap();
