# NestJS ile Blog Uygulaması

## Genel

- NestJS ile blog uygulaması backendi yazılacak.
- TypeScript ile yazılacak.
- MongoDB ile database yapılacak.

## Kütüphaneler

- nestjs/config
- nestjs/mongoose
- mongoose
- nestjs/jwt
- nestjs/passport
- passport
- passport-jwt
- passport-local
- class-validator
- class-transformer
- bcrypt
- helmet
- cors
- @types/bcrypt
- @types/node
- @types/express
- @types/jsonwebtoken
- @types/passport-jwt
- @types/passport-local

## API Routes

- POST `/auth/register` - Yeni bir kullanıcı kayıt
- POST `/auth/login` - Kullanıcı girişi
- POST `/auth/logout` - Kullanıcı çıkışı
- POST `/auth/refresh-token` - Token yenileme

- GET `/user/me` - Mevcut kullanıcı bilgileri
- PATCH `/user/me` - Profil bilgilerini güncelle

- GET `/posts` - Tüm yazıları getir
- GET `/posts/:id` - Yazıyı getir
- POST `/posts` - Yeni bir yazı oluştur (Auth gerekli)
- PATCH `/posts/:id` - Yazıyı güncelle (Auth gerekli, yazarı aynı olmalı)
- DELETE `/posts/:id` - Yazıyı sil (Auth gerekli, yazarı aynı olmalı)
- POST `/posts/:id/comments` - Yeni bir yorum oluştur (Auth gerekli)
- GET `/posts/:id/comments` - Yazıya ait yorumları getir
