// Custom Transform Pipe
// id parametresini sayayıya çeviren custom pipe
// id parametresi string olarak gelir
// id parametresi number olarak çıkacak

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // string olan value'yu number'a çevirdik
    const val = parseInt(value);

    // sayı veritipinde gelmezse hata fırlat
    if (isNaN(val)) {
      throw new BadRequestException('Geçersiz Id');
    }

    // sayı 0'dan küçük gelirse hata fırlat
    if (val < 0) {
      throw new BadRequestException('ID sıfırdan küçük olamaz');
    }

    // çıkış değerini return ed
    return val;
  }
}
