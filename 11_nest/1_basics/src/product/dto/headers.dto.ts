import { Expose } from 'class-transformer';
import { IsString, Min } from 'class-validator';

export class HeadersDTO {
  @IsString()
  @Expose({ name: 'authorization' })
  authorization: string;
}
