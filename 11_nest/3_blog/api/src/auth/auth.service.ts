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
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
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

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Bu kullanıcı adı veya email adresi kullanımda',
        );
      }

      throw error;
    }
  }

  async login(user: Omit<UserDocument, 'password'>) {
    const { _id, username } = user;

    const tokens = await this.generateTokens(_id as string, username);

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshTokenDto: string) {
    return 'test';
  }

  async logout(userId: string, refreshTokenDto: string) {
    await this.userService.removeRefreshToken(userId);
    return { success: true };
  }
}
