import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Projedeki tüm modüller için ortak bir valiasyon tanımladık
  // Global tanımın dezantajı: grupları kullanamayız
  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
