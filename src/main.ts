import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  // Swagger Options
  const options = new DocumentBuilder()
    .setTitle('Carambar')
    .setDescription('Carambar API description')
    .setVersion('1.0')
    .setBasePath(apiPath)
    .setContact(
      'David Besse',
      'https://github.com/David-Besse/carambar',
      'davidb.webdev@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
