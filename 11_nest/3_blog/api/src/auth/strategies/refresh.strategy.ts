import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_REFRESH_SECRET') ||
        'default_another_secret',
    });
  }

  // access token'ın doğruluğunu kontrol et
  async validate(payload: any) {
    // payload'ın içindeki sub'ı kullanarak kullanıcıyı bul
    const user = await this.userService.findById(payload.sub);

    console.log('refresh', user);

    // kullanıcı bulunamadıysa hata döndür
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // kullanıcı bulunduysa kullanıcıyı döndür
    return user;
  }
}
