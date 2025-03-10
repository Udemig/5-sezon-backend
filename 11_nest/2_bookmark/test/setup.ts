import * as dotenv from 'dotenv';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Yükleme ortam değişkenleri
// Dosya yoksa, mevcut env değişkenlerine güvenir
dotenv.config({
  path: join(process.cwd(), '.env.test'),
});

// Test ortamı için süre aşımı süresini artır
jest.setTimeout(30000);

// Test çalıştırması için benzersiz bir ID oluştur
// Bu ID ile farklı test dosyalarındaki test kullanıcıları karışmaz
export const TEST_ID = uuidv4().substring(0, 8);
