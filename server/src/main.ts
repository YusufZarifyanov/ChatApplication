import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT') || 4000;
  console.log(PORT);
  await app.listen(PORT);
}
bootstrap();
