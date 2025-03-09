import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    try {
      const user = req.user as { id: number; email: string };
      if (!user || !user.id) {
        throw new ForbiddenException('Invalid refresh token');
      }
      
      const refreshToken = req.headers.authorization?.split(' ')[1] || '';
      if (!refreshToken) {
        throw new ForbiddenException('Refresh token is required');
      }
      
      return this.authService.refreshTokens(user.id, refreshToken);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new ForbiddenException('Could not refresh tokens');
    }
  }
} 