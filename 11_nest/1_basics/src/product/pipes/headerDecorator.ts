import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'; // DTO dönüşümü için
import { validateOrReject } from 'class-validator'; // Doğrulama için

export const RequestHeader = createParamDecorator(
  // createParamDecorator, NestJS'de özel bir parametre dekoratörü oluşturur
  // Parametre olarak bir fabrika fonksiyonu alır: (data, ctx) => {}
  async (targetDTO: any, ctx: ExecutionContext) => {
    // targetDTO: Hedef DTO sınıfı (örneğin, HeaderDTO), başlıkların dönüştürüleceği şema
    // ctx: ExecutionContext, isteğin bağlamına (HTTP, WebSocket, vb.) erişim sağlar

    // 1. HTTP isteğinden başlıkları (headers) alıyoruz
    // ctx.switchToHttp().getRequest() ile HTTP isteğine erişip headers özelliğini çekiyoruz
    const headers = ctx.switchToHttp().getRequest().headers;

    // 2. Başlıkları hedef DTO'ya dönüştürüyoruz
    // plainToInstance: Düz bir JS nesnesini (headers) belirtilen DTO sınıfına dönüştürür
    // excludeExtraneousValues: DTO'da tanımlı olmayan ekstra alanları dışarıda bırakır
    const dto = plainToInstance(targetDTO, headers, {
      excludeExtraneousValues: true,
    });

    // 3. Dönüştürülen DTO'yu doğruluyoruz
    // validateOrReject: class-validator ile DTO'nun doğrulama kurallarını kontrol eder
    // Eğer doğrulama başarısız olursa, bir hata fırlatır (Promise.reject)
    await validateOrReject(dto);

    // 4. Doğrulama başarılıysa, dönüştürülmüş ve doğrulanmış DTO'yu döndürüyoruz
    // Bu değer, dekoratörün kullanıldığı parametreye enjekte edilir
    return dto;
  },
);
