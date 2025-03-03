// DTO'ları içerisinde validation işlemleri yaparız
// Ardından validation pipe kullanarak body'deki verileri doğrulayabiliriz

import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreatePropertyDTO {
  @IsString()
  @Length(2, 10)
  name: string;

  @IsString()
  @Length(5, 20)
  description: string;

  @IsInt()
  @IsPositive()
  @Min(100)
  area: number;
}

type Property = {
  name: string;
  description: string;
  area: number;
};
