import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // useGuards ile access token kontrolü yapılıyor
  // getUser ile user bilgileri alınıyor
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUsers(@GetUser() user: User) {
    return user;
  }

  // useGuards ile access token kontrolü yapılıyor
  // @GetUser('id') ile user id'sini al
  // @Body ile body'yi al
  // EditUserDto ile body'nin içindeki verileri kontrol et
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  updateUser(@GetUser('id') id: number, @Body() body: EditUserDto) {
    return this.userService.updateUser(id, body);
  }
}
