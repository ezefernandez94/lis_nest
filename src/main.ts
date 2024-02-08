import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CustomLoggerService } from './custom-logger/custom-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  // This would enable the logger globally
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true,
  // });
  // app.useLogger(app.get(CustomLoggerService))

  const app = await NestFactory.create(AppModule);
  // This will catch all errors with the custom exceptions filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters( new AllExceptionsFilter(httpAdapter))
  // CORS can be added, but config is needed not to be "too public"
  // app.enableCors()
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
