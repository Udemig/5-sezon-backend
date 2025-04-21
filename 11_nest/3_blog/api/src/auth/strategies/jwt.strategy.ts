import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      // tokenı cookie'den al
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    });
  }

  // access token'ın doğruluğunu kontrol et
  async validate(payload: any) {
    // payload'ın içindeki sub'ı kullanarak kullanıcıyı bul
    const user = await this.userService.findById(payload.sub);

    console.log('selammmm');

    // kullanıcı bulunamadıysa hata döndür
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // kullanıcı bulunduysa kullanıcıyı döndür
    return user;
  }
}
