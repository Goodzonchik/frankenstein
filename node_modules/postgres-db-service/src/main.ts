import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

const appConfig = {
  globalPrefix: 'api',
  port: 3000,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(appConfig.globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Frankenstain')
    .setDescription('Frankenstain API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
