import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne() {}

  @Post()
  create(@Body() body: any) {
    console.log('SELAM', body);
    return this.userService.create(body);
  }
}
