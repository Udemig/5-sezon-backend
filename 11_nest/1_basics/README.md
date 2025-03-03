# Nestjs

- Nestjs, modern api'lar geliştirmek için kullanılan açık kaynaklı ve typescript tabanlı framework'tür.

## Neden Node.js Yerine Nest.js ?

- Modüler Mimari: Kodun yönetilebiliriğini kolaylaştırır

- Dependency Injection: Bağımlılıkların yönetilmesini sağlayarak kodun sürdürülebilriğini ve test edilebilirliğini arttır.

- Entegre Typescript Desteği:

- Angular'dan esinlenildi:

- Http sunucu desteği: Express entegre olarak gelir

- Ölçeklenebiliri: Hrm küçü hem de büyük ölçekli uygulamalarda veriöli şekilde kullanılabilir

- Kapsamlı Ekosistem ve Dökümantasyon:

## Nest CLI Komutları

### Ayağa Kaldırma Komutları

```bash
# geliştirici modu
$ npm run start

# izleme modu
$ npm run start:dev

# yayınlama modu
$ npm run start:prod
```

### Test Komutlar

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Oluşturma - Generate Komutları

```bash
# yeni bir modül oluşturma
$ nest g module modül_ismi

# yeni bir controller oluşturma
$ nest g controller/co modül_ismi

# yeni bir service oluşturma
$ nest g service/s modül_ismi
```

# Nest Temel Kavramlar

# Controller

- Next.js'de controller'lar HTTP isteklerini alan ve yanıt veren sınıflardır.
- Controller içerisinde tanımlanan route'ları uygulamamızın enpoint'lerini oluşturur

```typescript
@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'Bütün mülk listesi';
  }
}
```

# Route Params

- Router parametreleri, URL içerinde dinamik olarka yaklamak için kullanılır
- `/users/id` şeklinde tanımama route'da id değerini yakalamak için @Param("id") ibaresini kullanırız

```typescript
  @Get(':id')
  finOne(@Param('id') id: string) {
    return { id, msg: `Bir mülk alındı` };
  }
```

# Query Params

- Arama parametreleri, URL içerinde dinamik olarka yaklamak için kullanılır
- `/products?sort=artan` şeklinde tanımama route'da sort değerini yakalamak için @Query() kullanırız

```typescript
  @Get()
  findAll(@Query() query) {
    return { query, msg: 'Bütün mülk listesi' };
  }
```

# Request Body

- İsteğin body kısmında göndeirlen veriye erişmek için @Body() ifadesini kullanırız
- @Body() fonksiyon verileri getirir ardından bir dğeişkene aktarır

```typescript
  @Post()
  create(@Body() body) {
    return { body, msg: `Mülk Oluşturuldu` };
  }
```

# Status Code

- Nest varsayılan olarka bütün endpointlerin status code'unu ayarlar
- Ama varsayılanın dışına çıkmak istersek @HttpCode() ile kendimiz ayarlayabiliriz.

```typescript
  @Post()
  @HttpCode(202)
  create() {
    return { msg: `Mülk Oluşturuldu` };
  }
```

# Transform Pipe

- Transform Pipe, gelen verileri belirli bir formata dönüştürmek için kullanılır
- String tipinde gelen id parametresini number'a çevirmek için kullanabiliriz

```typescript
  @Get(':id')
  finOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return { id, type: typeof id, sort, msg: `Bir mülk alındı` };
  }
```

# Validation Pipe

- Validation Pipe, gelen verilerin istenilen formata uygun olup olmadığını kontrol eder.
- NestJS `class-validator` ve `class transformer` kütüphaneleri ile birlikte çalışarak DTO(Data Transfer Object) bazlı doğrulama yapmamıza olanak sağlar
- Validation pipe'ı aktifleştirdikten sonra body'deki veri tipi neyse gelen vere o tipe uygun mu diye kontrol eder

```ts
  @Post()
  @HttpCode(202)
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreatePropertyDTO) {
    return { body, msg: `Mülk Oluşturuldu` };
  }
```

# Validation Groups

- Aynı DTO içerisinde farklı valiasyon kuralları belirlemizi sağlar

```ts
  @IsString()
  @Length(5, 10) // create gruplarında çalışır
  @Length(10, 20, { groups: ['update'] }) // update gruplarında çalışır
  description: string;
```

# Global & Module Level Validation

- Her controller'da tek tek valiasyon pipe'ını etkinelştirmek yerine
- Global olarak büütn müdller için veya
- Spesifk olarka bir modülün içindeki bütün controller için validasyonu aktif edebiliyoruz

# Param Validation

- Class-Validator veya Custom-Transform-Pipe kullanarak parametrelerin validasyonunu yapabiliriz.

## Class Validator

```ts
export class IdParamDTO {
  @IsInt()
  @IsPositive()
  @Max(100)
  id: number;
}

@Param() param: IdParamDTO,
```

# Custom Transform Pipe

- Kendi özel tranform pipe elemanımızı oluturma

```ts
export class ParseIdPipe implements PipeTransform<string, number> {}
```

# Custom Validation Pipe

- Kendi özel validation pipe elemanımızı oluturma

```ts
export class ZodValidationPipe implements PipeTransform {}
```

# Zod

- Class-Validator muadili bir DTO kütüphanesi
- Class-Validator'a göre daha okunabilir bir syntaxa sahip
- Class-Validator'a göre methodları daha zengin
- Infer özelliği sayesinde şema üzerinden typescirpt tiplerine erişebiliyor

# Header Validation

- @Header() ile headerlara erişebiliriz.
- Class-Validator veya ZOD kullanarak header validasyonu doğrudan yapılamıyor.
- Heade valisdasyonu yapabilmek için custom-decator'lara ihtiyaç duyarız

# Custom Decorator

- Custom Decorator, geliştiricinin kendi ihtiyaçlarına özel olarak oluşturduğu bir dekoratördür.

```ts
export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {},
);
```

# Dependency Injection (DI)

- Bir sınıfın ihtiyaç duyduğu bağımlılıkarlı (service) sınıfın kendisi tarafından oluşturmak yerine, otomatik olarak sağlanması işlemidir

* Daha Modüle ve Temiz bir Kod
* Gerçek nesneler yerine sahtelerini(mock) koyarak test sürecini kolaylaştırır
* Esnek

# Nest.js Veritabanı Entegrasyonu

- Nest.js Veritbanı entegrasyonu için kendi içerisinde belirli bir çözüm sunmaz
- Bunun yerine popüler kütüphaneler kullanarak entegrasyon yaparız

- TypeORM: ilişkisel veritbanları (PostgreSQL,MySQL,SQLite.) için kullanılır
- Sequelize
- Mongoose
- Prisma
