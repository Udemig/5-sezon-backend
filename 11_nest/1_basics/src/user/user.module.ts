import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  // Bu method, user module'ünde kullanılacak Mongodb Model'ini tanımlar
  // Modüle, bu modülde hangi kolleksiyonları kullanacağız sorusunun cevabını veriri
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
