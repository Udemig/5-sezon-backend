import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDocument } from 'src/user/schemas/user.schemas';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // kullanıcı doğrulaması yap
    const user = await this.authService.validateUser(username, password);

    // kullanıcı bulunamadıysa hata döndür
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // kullanıcı verisini request nesnesi içerisine ekle
    return user;
  }
}
