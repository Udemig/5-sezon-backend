import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemoveSensitiveFieldsInterceptor } from './interceptor/sensetive-fields.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalInterceptors(new RemoveSensitiveFieldsInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
