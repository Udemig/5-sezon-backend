import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
