import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateBookmarkDto } from '../src/bookmark/dto/create-bookmark.dto';
import { EditBookmarkDto } from '../src/bookmark/dto/edit-bookmark.dto';
import { TEST_ID } from './setup';

describe('BookmarkController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // Test user data
  const testUser = {
    email: `bookmark-test-${TEST_ID}@example.com`,
    password: 'password123',
    firstName: 'Bookmark',
    lastName: 'Tester',
  };

  // Test bookmark data
  const testBookmark: CreateBookmarkDto = {
    title: 'Test Bookmark',
    description: 'This is a test bookmark',
    link: 'https://example.com/test',
  };

  // Updated bookmark data
  const updatedBookmark: EditBookmarkDto = {
    title: 'Updated Bookmark',
    description: 'This is an updated test bookmark',
  };

  // Storage for created bookmark and auth token
  let bookmarkId: number;
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

  // Bookmark oluşturma testi
  describe('POST /bookmarks', () => {
    it('yetkilendirilmiş kullanıcı bookmark oluşturabilmeli', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookmarks')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(testBookmark)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(testBookmark.title);
      expect(response.body.description).toBe(testBookmark.description);
      expect(response.body.link).toBe(testBookmark.link);

      // Sonraki testler için bookmark ID'sini sakla
      bookmarkId = response.body.id;
    });

    it('geçersiz veri ile bookmark oluşturulamamalı', async () => {
      const invalidBookmark = {
        // title eksik (zorunlu alan)
        description: 'Invalid bookmark',
        // link eksik (zorunlu alan)
      };

      await request(app.getHttpServer())
        .post('/bookmarks')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(invalidBookmark)
        .expect(400);
    });

    it('kimlik doğrulama olmadan bookmark oluşturulamamalı', async () => {
      await request(app.getHttpServer())
        .post('/bookmarks')
        .send(testBookmark)
        .expect(401);
    });
  });

  // Tüm bookmarkları getirme testi
  describe('GET /bookmarks', () => {
    it('yetkilendirilmiş kullanıcı kendi bookmarklarını alabilmeli', async () => {
      const response = await request(app.getHttpServer())
        .get('/bookmarks')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
    });

    it('kimlik doğrulama olmadan bookmarklar alınamamalı', async () => {
      await request(app.getHttpServer()).get('/bookmarks').expect(401);
    });
  });

  // Belirli bir bookmark'ı getirme testi
  describe('GET /bookmarks/:id', () => {
    it("yetkilendirilmiş kullanıcı belirli bir bookmark'ı alabilmeli", async () => {
      const response = await request(app.getHttpServer())
        .get(`/bookmarks/${bookmarkId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', bookmarkId);
      expect(response.body.title).toBe(testBookmark.title);
      expect(response.body.description).toBe(testBookmark.description);
      expect(response.body.link).toBe(testBookmark.link);
    });

    it("var olmayan bir bookmark ID'si ile 404 hatası alınmalı", async () => {
      await request(app.getHttpServer())
        .get('/bookmarks/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('kimlik doğrulama olmadan belirli bir bookmark alınamamalı', async () => {
      await request(app.getHttpServer())
        .get(`/bookmarks/${bookmarkId}`)
        .expect(401);
    });
  });

  // Bookmark güncelleme testi
  describe('PATCH /bookmarks/:id', () => {
    it("yetkilendirilmiş kullanıcı bookmark'ı güncelleyebilmeli", async () => {
      const response = await request(app.getHttpServer())
        .patch(`/bookmarks/${bookmarkId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updatedBookmark)
        .expect(200);

      expect(response.body).toHaveProperty('id', bookmarkId);
      expect(response.body.title).toBe(updatedBookmark.title);
      expect(response.body.description).toBe(updatedBookmark.description);
      // Link değişmedi, orijinal değerini korumalı
      expect(response.body.link).toBe(testBookmark.link);
    });

    it("var olmayan bir bookmark ID'si ile 404 hatası alınmalı", async () => {
      await request(app.getHttpServer())
        .patch('/bookmarks/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updatedBookmark)
        .expect(404);
    });

    it('kimlik doğrulama olmadan bookmark güncellenememeli', async () => {
      await request(app.getHttpServer())
        .patch(`/bookmarks/${bookmarkId}`)
        .send(updatedBookmark)
        .expect(401);
    });
  });

  // Bookmark silme testi
  describe('DELETE /bookmarks/:id', () => {
    it("yetkilendirilmiş kullanıcı bookmark'ı silebilmeli", async () => {
      await request(app.getHttpServer())
        .delete(`/bookmarks/${bookmarkId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it("silinen bookmark'a erişmeye çalışırken 404 hatası alınmalı", async () => {
      await request(app.getHttpServer())
        .get(`/bookmarks/${bookmarkId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it("var olmayan bir bookmark ID'si ile 404 hatası alınmalı", async () => {
      await request(app.getHttpServer())
        .delete('/bookmarks/999999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('kimlik doğrulama olmadan bookmark silinememeli', async () => {
      await request(app.getHttpServer())
        .delete(`/bookmarks/${bookmarkId}`)
        .expect(401);
    });
  });
});
