import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Request as Req } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // gelen access tokenını doğrulayacak ve kullanıcı bilgilerini döndürecek
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: Req) {
    // zaten authguard kullanıcı bilgilerini req içine koymuştu
    return req.user;
  }

  // gelen access tokenını doğrulayacak
  // kullanıcı bilgilerini güncelle
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Request() req: Req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user!._id, updateUserDto);
  }
}
