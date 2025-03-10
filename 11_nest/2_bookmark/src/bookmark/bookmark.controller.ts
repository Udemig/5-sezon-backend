import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  // Bütün bookmarkları getir
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  // Belirli bir bookmark'ı getir
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  // Yeni bir bookmark oluştur
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() body: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, body);
  }

  // Belirli bir bookmark'ı güncelle
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() body: EditBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(userId, bookmarkId, body);
  }

  // Belirli bir bookmark'ı sil
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmark(userId, bookmarkId);
  }
}
