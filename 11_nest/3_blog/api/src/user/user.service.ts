import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // user modelini inject et
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // kullanıcıyı oluştur
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);

    const user = await newUser.save();

    return user.toObject();
  }

  // bütün kullanıcıları getir
  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  // kullanıcıyı getir
  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }

  // kullanıcıyı getir
  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }

  // kullanıcıyı güncelle
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }

  // kullanıcıyı sil
  async delete(id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return deletedUser;
  }

  // refresh tokenu güncelle
  async setRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // refresh tokenu kaldır
  async removeRefreshToken(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: '' });
  }

  // kullanıcın tokeni var mı ?
  async hasRefreshToken(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    return !!user?.refreshToken;
  }
}
