import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // local strategy'i kullanıp isim ve şifre doğrulaması yap
  // authService'de tokenları oluşturup geri döndür
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  // TODO: logout
  // jwt strategy'i kullanıp access token' doğrulaması yap
  // authService'de refresh token'ı db'den kaldır
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Request() req, @Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(req.user._id, refreshTokenDto.refreshToken);
  }
}
