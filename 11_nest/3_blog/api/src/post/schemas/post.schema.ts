import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  tags: string[];

  @Prop()
  photo: string;

  // yorum sayısı sanal özelliği
  commentCount?: number;

  // beğeni sayısı sanal özelliği
  likeCount?: number;

  // paylaşım sayısı sanal özelliği
  shareCount?: number;
}

const PostSchema = SchemaFactory.createForClass(Post);

// yorum sayısını döndür
PostSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true,
});

// rastgele beğeni sayısı döndür
PostSchema.virtual('likeCount').get(function () {
  return Math.floor(Math.random() * 100);
});

// rastgele paylaşım sayısı döndür
PostSchema.virtual('shareCount').get(function () {
  return Math.floor(Math.random() * 50);
});

export { PostSchema };
