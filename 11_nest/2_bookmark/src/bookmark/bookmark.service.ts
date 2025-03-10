import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  // Bütün bookmarkları getir
  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId },
    });

    if (!bookmarks || bookmarks.length === 0) {
      throw new NotFoundException('No bookmarks found');
    }

    return bookmarks;
  }

  // Belirli bir bookmark'ı getir
  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  // Yeni bir bookmark oluştur
  async createBookmark(userId: number, body: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...body,
      },
    });

    return bookmark;
  }

  // Belirli bir bookmark'ı güncelle
  async updateBookmark(
    userId: number,
    bookmarkId: number,
    body: EditBookmarkDto,
  ) {
    // güncellenicek bookmark'ı bul
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId },
    });

    // bookmark bulunamadıysa
    if (!bookmark) throw new NotFoundException('Bookmark not found');

    // bookmark istek atan kişiye ait mi kontrol et
    if (bookmark.userId !== userId)
      throw new ForbiddenException('İçereğe erişim reddedildi');

    // bookmark'ı güncelle
    const updatedBookmark = await this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...body },
    });

    // güncellenen bookmark'ı dön
    return updatedBookmark;
  }

  // Belirli bir bookmark'ı sil
  async deleteBookmark(userId: number, bookmarkId: number) {
    // silinecek bookmark'ı bul
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId },
    });

    // bookmark bulunamadıysa
    if (!bookmark) throw new NotFoundException('Bookmark bulunamadı');

    // bu bookmark kişiye ait mi kontrol et
    if (bookmark.userId !== userId)
      throw new ForbiddenException('İçereğe erişim reddedildi');

    // bookmark'ı sil
    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
