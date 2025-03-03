import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  // Nest.js'in dependency injection sistemi kullanıldı
  // MongoDB modelini servise enjekte ettik
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException("Bu id'li kullanıcı bulunamadı");
    }

    return user;
  }

  async create(createUserDTO: any): Promise<User> {
    const newUser = new this.userModel(createUserDTO);

    return newUser.save();
  }
}
