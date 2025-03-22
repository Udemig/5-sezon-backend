import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from 'src/user/schemas/user.schemas';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly postService: PostService,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: UserDocument,
  ) {
    // gönderi id'si geçerli mi kontrol et
    await this.postService.findOne(postId);

    // yeni yorumu oluştur
    const newComment = new this.commentModel({
      ...createCommentDto,
      post: postId,
      author: user.id,
    });

    // yorumu kaydet ve dön
    return await newComment.save();
  }

  async delete(id: string, user: UserDocument) {
    // yorumu bul
    const comment = await this.commentModel.findById(id);

    // yorum bulunamadıysa hata dön
    if (!comment) {
      throw new NotFoundException(`Yorum bulunamadı`);
    }

    // yorumun yazarının kullanıcının id'siyle aynı olup olmadığını kontrol et
    if (comment.author.toString() !== (user._id as string).toString()) {
      throw new NotFoundException('Bu yorumu silmeye yetkiniz yok');
    }

    // yorumu sil
    await this.commentModel.findByIdAndDelete(id);

    return { message: 'Yorum başarıyla silindi' };
  }

  async findAllByPost(postId: string) {
    // gönderi id'si geçerli mi kontrol et
    await this.postService.findOne(postId);

    // gönderiye ait yorumları getir
    return this.commentModel
      .find({ post: postId })
      .populate('author', '-password -refreshToken -__v')
      .sort({ createdAt: -1 });
  }
}
