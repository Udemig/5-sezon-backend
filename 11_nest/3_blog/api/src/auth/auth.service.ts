import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/user/schemas/user.schemas';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      return user;
    }

    return null;
  }

  generateAccessToken(userId: string, username: string) {
    const payload = { username, sub: userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });
  }

  async generateRefreshToken(userId: string, username: string) {
    const payload = { username, sub: userId };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
    });

    // veritabanında refresh tokeni kaydet
    await this.userService.setRefreshToken(userId, refreshToken);

    return refreshToken;
  }

  async generateTokens(userId: string, username: string) {
    return {
      accessToken: this.generateAccessToken(userId, username),
      refreshToken: await this.generateRefreshToken(userId, username),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Bu kullanıcı adı veya email adresi kullanımda',
        );
      }

      throw error;
    }
  }

  async login(user: UserDocument) {
    const tokens = await this.generateTokens(user._id as string, user.username);

    return {
      user: {
        id: (user._id as string).toString(),
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    };
  }

  async refreshToken(user: UserDocument) {
    return 'test';
  }

  async logout(userId: string) {
    await this.userService.removeRefreshToken(userId);
    return { success: true };
  }
}
