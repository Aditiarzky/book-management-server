import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from './common/interceptor/response.iterceptor';
import { GlobalExceptionFilter } from './common/filters/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Book Reader API')
    .setDescription('API for managing kontens, genres, and chapters')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://riztranslation.rf.gd', 'http://riztranslation.rf.gd', 'https://www.riztranslation.rf.gd', 'http://www.riztranslation.rf.gd'], 
    credentials: true,
  });

  // Interceptor untuk wrap response sukses
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Filter untuk wrap error
  app.useGlobalFilters(new GlobalExceptionFilter());


  await app.listen(process.env.PORT || 3000);
}
bootstrap();