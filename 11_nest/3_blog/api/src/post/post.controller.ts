import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Body,
  Request,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';

import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { Request as Req } from 'express';
import { UserDocument } from 'src/user/schemas/user.schemas';
import { UpdatePostDto } from './dto/update-post.dto.';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: Req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user as UserDocument, createPostDto);
  }

  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/own')
  findAllByUserId(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Request() req: Req,
  ) {
    console.log(req);
    return this.postService.findAll(page, limit, req.user as UserDocument);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: Req,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, req.user as UserDocument, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: Req) {
    return this.postService.delete(id, req.user as UserDocument);
  }
}
