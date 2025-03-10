import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface User {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string | null;
  lastName: string | null;
  hash?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        config.get<string>('JWT_SECRET') || 'fallback-secret-for-dev',
    });
  }

  // validate fonksiyonu, tokenı doğrulayıp içindeki verilere erişir
  async validate(payload: { sub: number; email: string }) {
    // kullanıcının id'sine göre kullanıcı bilgilerini al
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    // kullanıcı bulunamazsa hata döndür
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // hash bilgisini sil
    delete user.hash;

    // kullanıcı bilgilerini döndür
    return user;
  }
}
