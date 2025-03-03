import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  CreateProductSchema,
  CreateProductType,
  HeaderType,
} from './dto/product.dto';
import { HeadersDTO } from './dto/headers.dto';
import { RequestHeader } from './pipes/headerDecorator';

@Controller('product')
export class ProductController {
  @Get()
  findAll(
    @RequestHeader(
      new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
    )
    header: HeadersDTO,
  ) {
    return { msg: 'Tüm ürünler', header };
  }

  // Post isteklerinde gelen body'i zod ile oluşturuğumuz şemaya uygun mu kontrolü yapıyoruz
  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() body: CreateProductType) {
    return {
      mesg: 'Ürün oluşturuldu',
      body,
    };
  }
}
