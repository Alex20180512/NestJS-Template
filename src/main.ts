import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './config/logger';
import { Response } from './config/response';

const port = 4000;
const title = 'ALife';
const description = 'App';
const apidoc = '/api-docs';
const apiPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Response());

  const options = new DocumentBuilder().setTitle(title).setDescription(description).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apidoc, app, document);

  await app.listen(port, () => {
    logger.log(`The server and http://127.0.0.1:4000/api-docs is running ${port} port`);
  });
}

bootstrap();
