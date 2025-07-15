import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('SWAPI')
    .setDescription('Uso de la api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    '/api-docs',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
