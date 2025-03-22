import { IsArray, IsString } from 'class-validator';

import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
