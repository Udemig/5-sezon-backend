import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignupDto } from '../src/auth/dto/auth.dto';
import { TEST_ID } from './setup';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // Test user data
  const testUser = {
    email: `auth-test-${TEST_ID}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  };

  // Tokens for authentication
  let accessToken: string;
  let refreshToken: string;

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
  });

  afterAll(async () => {
    await app.close();
  });

  // Signup testi
  describe('POST /auth/signup', () => {
    it('geçerli kimlik bilgileriyle kaydolmalı', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('refresh_token');

      // Daha sonra kullanmak için tokenleri sakla
      accessToken = response.body.access_token;
      refreshToken = response.body.refresh_token;
    });

    it('tekrarlanan email ile kaydolurken hata vermeli', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(403);
    });

    it('eksik girdiler olduğunda doğrulama hatası vermeli', async () => {
      const invalidUser = {
        email: 'not-an-email',
        password: '',
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(invalidUser)
        .expect(400);
    });
  });

  // Login testi
  describe('POST /auth/login', () => {
    it('geçerli kimlik bilgileriyle giriş yapmalı', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('refresh_token');

      // Mevcut tokenleri güncelle
      accessToken = response.body.access_token;
      refreshToken = response.body.refresh_token;
    });

    it('geçersiz email ile giriş yaparken hata vermeli', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrong@example.com',
          password: testUser.password,
        })
        .expect(403);
    });

    it('geçersiz şifre ile giriş yaparken hata vermeli', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(403);
    });
  });

  // Çıkış testi
  describe('POST /auth/logout', () => {
    it('başarılı çıkış yapmalı', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Logged out successfully');
    });
  });

  // Token yenileme testi
  describe('POST /auth/refresh', () => {
    it('yenileme tokeniyle yeni erişim tokeni almalı', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');

      // Erişim tokenini güncelle
      accessToken = response.body.access_token;
    });

    it('geçersiz yenileme tokeni ile hata vermeli', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('yenileme tokeni olmadan hata vermeli', async () => {
      await request(app.getHttpServer()).post('/auth/refresh').expect(401);
    });
  });
});
