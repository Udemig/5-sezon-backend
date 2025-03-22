import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveSensitiveFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.removeSensitiveFields(data);
      }),
    );
  }

  // hassas alanları kaldıran yardımcı fonksiyon
  private removeSensitiveFields(data: any): any {
    if (!data) return data;

    // eğer data bir dizi ise, her öğeyi işle
    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveFields(item));
    }

    // eğer data bir obje ise
    if (typeof data === 'object') {
      // doğrudan obje üzerinde değişiklik yapmamak için kopyasını al
      const result = { ...data };

      // hassas alanları kaldır
      delete result.__v;
      delete result.refreshToken;
      delete result.password;

      // eğer objenin toObject metodu varsa (Mongoose dökümanı ise)
      if (data.toObject && typeof data.toObject === 'function') {
        const plainObject = data.toObject();
        delete plainObject.__v;
        delete plainObject.refreshToken;
        delete plainObject.password;

        // _id'yi string'e çevir
        if (plainObject._id) {
          // Buffer tipinde olabilir
          if (Buffer.isBuffer(plainObject._id)) {
            plainObject._id = plainObject._id.toString('hex');
          }
          // ObjectId tipinde olabilir
          else if (typeof plainObject._id.toString === 'function') {
            plainObject._id = plainObject._id.toString();
          }
        }

        return plainObject;
      }

      // _id'yi string'e çevir (normal objeler için)
      if (result._id) {
        // Buffer tipinde olabilir
        if (Buffer.isBuffer(result._id)) {
          result._id = result._id.toString('hex');
        }
        // ObjectId tipinde olabilir
        else if (typeof result._id.toString === 'function') {
          result._id = result._id.toString();
        }
      }

      // objenin içindeki diğer nesneleri de temizle
      for (const key in result) {
        if (result[key] && typeof result[key] === 'object') {
          result[key] = this.removeSensitiveFields(result[key]);
        }
      }

      return result;
    }

    return data;
  }
}
