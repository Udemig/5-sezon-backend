import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
