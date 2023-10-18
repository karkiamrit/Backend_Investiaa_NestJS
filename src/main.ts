// import { graphqlUploadExpress } from 'graphql-upload';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './modules/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './modules/interceptors/timeout.interceptor';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  );

  // fetch('/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json', // Set the appropriate content-type
  //     // Add other headers if needed
  //   },
  //   body: JSON.stringify({
  //     query: 'Your GraphQL Query',
  //     // Include variables if required
  //   }),
  // })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));

  console.log('hi');
  app.enableCors({
    origin: '*',
    // credentials: true,
  });
  const configService = app.select(AppModule).get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
