import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    // Generate password hash
    const hash = await argon.hash(dto.password);

    try {
      // Create user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      // Generate tokens
      const accessToken = await this.signAccessToken(user.id, user.email);
      const refreshToken = await this.signRefreshToken(user.id, user.email);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    // Compare password with hash
    const passwordMatches = await argon.verify(user.hash, dto.password);

    // If password incorrect throw exception
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    // Generate tokens
    const accessToken = await this.signAccessToken(user.id, user.email);
    const refreshToken = await this.signRefreshToken(user.id, user.email);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout() {
    // In a more complete implementation, you might invalidate tokens
    // For now, client-side logout is sufficient (clearing tokens)
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    // user'ı bul
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // user bulunamadıysa
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // yeni erişim token'i oluştur
    const token = await this.signAccessToken(user.id, user.email);

    return {
      access_token: token,
    };
  }

  async signAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return accessToken;
  }

  async signRefreshToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    return refreshToken;
  }
}
