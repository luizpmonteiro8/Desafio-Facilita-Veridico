import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://desafio-facilita-veridico.vercel.app',
      /^http:\/\/localhost:\d+$/,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://desafio-facilita-veridico.vercel.app',
      /^http:\/\/localhost:\d+$/,
    );
    next();
  });

  await app.listen(3000);
}
bootstrap();
