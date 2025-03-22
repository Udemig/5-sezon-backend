import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request as Req } from 'express';
import { User, UserDocument } from 'src/user/schemas/user.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // local strategy'i kullanıp isim ve şifre doğrulaması yap
  // authService'de tokenları oluşturup geri döndür
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: Req,
    @Res({ passthrough: true }) res,
    @Body() loginDto: LoginDto,
  ) {
    const { user, access, refresh } = await this.authService.login(
      req.user as UserDocument,
    );

    res.cookie('refresh_token', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user, access };
  }

  // refresh strategy'i kullanıp refresh token'ı doğrulaması yap
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refresh(@Request() req: Req) {
    return {
      access_token: this.authService.generateAccessToken(
        req.user!._id,
        req.user!.username,
      ),
    };
  }

  // jwt strategy'i kullanıp access token' doğrulaması yap
  // authService'de refresh token'ı db'den kaldır
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: Req) {
    return await this.authService.logout(req.user!._id);
  }
}
