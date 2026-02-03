import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { TransformInterceptor } from './common/intercepters/transform.interceptor';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api/v1', { exclude: ['apidoc'] });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
