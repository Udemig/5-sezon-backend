import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

// Custom Validation Pipe
// Value olarka gelen detayı alır
// Zod ile oluşturuğumuz şemayı alır
// Data şemadaki kurallara uygunsa datayı return eder
// Data şemadaki kurallara uygun değilse hata fırlatır

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const parsed = this.schema.safeParse(value);

    if (parsed.success) return parsed.data;

    throw new BadRequestException(parsed.error.format());
  }
}
