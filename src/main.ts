import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('todo-list-api')
    .setDescription('Api de todo el proyecto todo-list')
    .setVersion('1.0')
    .addTag('todo-list')
    .build();
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true,   // genera error si hay propiedades no permitidas
    transform: true,              // convierte tipos según DTO (ej: string a número)
  }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
