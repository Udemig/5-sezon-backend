import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDTO } from './dto/createProperty.dto';
import { IdParamDTO } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';

@Controller('property')
export class PropertyController {
  // Bir endpoint tanımladık
  // HTTP Get isteği atılınca findAll fonksiyonu çalışır
  // findAll fonksiyonunun döndürdüğü değer client'a gider
  // @Query ile arama parametrelerine erişebiliyoruz
  @Get()
  findAll(@Query() query) {
    return { query, msg: 'Bütün mülk listesi' };
  }

  // İd parametresi tanımlandı
  // @Param ile parametreye erişiriz
  // ParseIntPipe ile id'yi number'a çeviriyoruz
  // ParseBoolPipe ile sort'u boolean'a çeviriyoruz
  @Get(':id')
  finOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return { id, type: typeof id, sort, msg: `Bir mülk alındı` };
  }

  // @Body ile Body'deki verileri alıyoruz
  // @HttpCode ile Http status kodunu belirledik
  // @UsePipes ile validasyonları yapmasını söyledik
  // whitelist sayesinde belirlenen tip dışında kalan verileri almaz
  // forbidNonWhitelisted belirlenen tip dışında veri gelirse hata fırlatır
  // alway ile create grubu dışarısında kalan validasyonları aktif ettik
  @Post()
  @HttpCode(202)
  create(@Body() body: CreatePropertyDTO) {
    return { body, msg: `Mülk Oluşturuldu` };
  }

  // Id parametresini DTO kullanarak doğruladık
  @Patch(':id')
  updatePart(@Param() { id }: IdParamDTO, @Body() body: CreatePropertyDTO) {
    return { id, body, msg: `Mülk Kısmi Güncellendi` };
  }

  // Id parametresini Custom Transform Pipe kullanarak doğruladık
  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number) {
    return { id, msg: `Mülk Güncellendi` };
  }

  @Delete()
  delete() {
    return `Mülk Kaldırıldı`;
  }
}
