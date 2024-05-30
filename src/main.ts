import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.enableCors({origin: true, credentials: true})
  app.use(cookieParser())
  // app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
