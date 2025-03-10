import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(id: number, body: EditUserDto) {
    // id'sine göre kullanıcın body'de gelen bilgilerini güncelle
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: { ...body },
    });

    // şifresini sil
    const { hash, ...userWithoutHash } = user;

    // güncellenen kullanıcı bilgilerini döndür
    return userWithoutHash;
  }
}
