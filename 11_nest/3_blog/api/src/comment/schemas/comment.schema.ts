import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'Post', type: mongoose.Schema.Types.ObjectId })
  post: string;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
