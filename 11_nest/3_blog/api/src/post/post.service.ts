import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UserDocument } from 'src/user/schemas/user.schemas';
import { UpdatePostDto } from './dto/update-post.dto.';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // Yeni bir post oluştur
  async create(
    user: UserDocument,
    createPostDto: CreatePostDto,
  ): Promise<PostDocument> {
    const newPost = new this.postModel({ ...createPostDto, author: user.id });

    return newPost.save();
  }

  // tüm postları getir
  async findAll(
    page: number = 1,
    limit: number = 10,
    user?: UserDocument,
  ): Promise<{
    posts: PostDocument[];
    total: number;
    totalPages: number;
  }> {
    console.log(user);
    // hem postları hem toplam sayıyı alıcak sorguları aynı anda çalıştırdık
    const [posts, total] = await Promise.all([
      this.postModel
        .find(user ? { author: user._id } : {})
        .populate('author', '-password -refreshToken -__v')
        .skip((page - 1) * limit)
        .limit(limit),
      this.postModel.countDocuments(),
    ]);

    return { total, totalPages: Math.ceil(total / limit), posts };
  }

  // tek bir postu getir
  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author', '-password -refreshToken -__v');

    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    return post;
  }

  // postu güncelle
  async update(id: string, user: UserDocument, updatePostDto: UpdatePostDto) {
    // postu bul
    const post = await this.postModel.findById(id);

    // post bulunamadıysa hata dön
    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    // postun yazarının kullanıcının id'siyle aynı olup olmadığını kontrol et
    if (post.author.toString() !== user.id) {
      throw new ForbiddenException('Bu gönderiyi güncellemeye yetkiniz yok');
    }

    // postu güncelle
    return this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  }

  // postu sil
  async delete(id: string, user: UserDocument) {
    // postu bul
    const post = await this.postModel.findById(id);

    // post bulunamadıysa hata dön
    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    // postun yazarının kullanıcının id'siyle aynı olup olmadığını kontrol et
    if (post.author.toString() !== user.id) {
      throw new ForbiddenException('Bu gönderiyi güncellemeye yetkiniz yok');
    }

    // postu sil
    return this.postModel.findByIdAndDelete(id);
  }
}
