import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto/edit-user.dto';
import { TEST_ID } from './setup';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // Test user data
  const testUser = {
    email: `user-test-${TEST_ID}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  };

  // Tokens for authentication
  let accessToken: string;

  beforeAll(async () => {
    // Create test app
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Validation pipeline setup to match app's pipeline
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    // Get prisma service
    prisma = app.get(PrismaService);

    // Temizle ve sıfırla
    await prisma.cleanDb();

    // Test kullanıcısı oluştur ve token al
    const signupResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);

    accessToken = signupResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  // Profil testi
  describe('GET /user/profile', () => {
    it('yetkilendirilmiş kullanıcı profil bilgilerini alabilmeli', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Kullanıcı bilgilerini kontrol et
      expect(response.body.email).toBe(testUser.email);
      expect(response.body.firstName).toBe(testUser.firstName);
      expect(response.body.lastName).toBe(testUser.lastName);

      // Şifre hash değeri dönmemeli
      expect(response.body).not.toHaveProperty('hash');
    });

    it('token olmadan profil bilgilerini alamamalı', async () => {
      await request(app.getHttpServer()).get('/user/profile').expect(401);
    });

    it('geçersiz token ile profil bilgilerini alamamalı', async () => {
      await request(app.getHttpServer())
        .get('/user/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  // Kullanıcı güncelleme testi
  describe('PATCH /user/update', () => {
    const updateData: EditUserDto = {
      firstName: 'Güncellenmiş',
      lastName: 'Kullanıcı',
    };

    it('yetkilendirilmiş kullanıcı bilgilerini güncelleyebilmeli', async () => {
      const response = await request(app.getHttpServer())
        .patch('/user/update')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200);

      // Güncellenen kullanıcı bilgilerini kontrol et
      expect(response.body.firstName).toBe(updateData.firstName);
      expect(response.body.lastName).toBe(updateData.lastName);
      expect(response.body.email).toBe(testUser.email);

      // Şifre hash değeri dönmemeli
      expect(response.body).not.toHaveProperty('hash');
    });

    it('geçersiz veri ile kullanıcı bilgilerini güncelleyememeli', async () => {
      const invalidData = {
        firstName: 123, // String olmalı ama sayı gönderiyoruz
        email: 'not-an-email', // Geçersiz email formatı
      };

      await request(app.getHttpServer())
        .patch('/user/update')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(invalidData)
        .expect(400);
    });

    it('token olmadan kullanıcı bilgilerini güncelleyememeli', async () => {
      await request(app.getHttpServer())
        .patch('/user/update')
        .send(updateData)
        .expect(401);
    });

    it('geçersiz token ile kullanıcı bilgilerini güncelleyememeli', async () => {
      await request(app.getHttpServer())
        .patch('/user/update')
        .set('Authorization', 'Bearer invalid-token')
        .send(updateData)
        .expect(401);
    });
  });
});
