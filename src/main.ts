import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['localhost:4200'],
  });
  app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
  });

  app.use(morgan('dev'));

  app
    .listen(3000)
    .then(() => {
      console.log('Server Started');
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
