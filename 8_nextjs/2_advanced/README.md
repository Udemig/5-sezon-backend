# Parallel Routes

- Parallel routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisinde ekrana basmaya yarar.

- Her sayfa kendi bağımsız yükleme mantığına sahiptir (loading | error)

- Slot: @ işareti ile tanımlanan sayfalara slot ismi verilir.

- Slot olarak tanımlanan sayfalar layout'a prop olarak gider

- Layout üzerinden slot olarak tanımlı sayfları aynı anda veya koşullu olarak ekran basabiliriz.

# Intercepted Routes - Önizlemeli Route

- Bir sayfaya yönlerinden linke tıkladığınızda öncelikle bir modal açıp sayfa detaylarını modal gösterip eğer sayfa yenilenirse bu sefer modal yerine sayfanın kendisini göstermek istiyorsak, bu yöntemi kullanırız.

- Bu özellik genel oalrak ürün/gönderi detay sayflarında , login/register sayfalarında ve form alanlarında karşımıza çıkar

# Client Side Render - Server Side Render (CSR - SSR)

- Client side rendering yötenmi uygulanan bir sayfaya girdiğimizde `js kodu` ve `boş html dosyası` indiririz. İndirilen js kodu `kendi bilgisayarımızda` çalışır ve html dosyasını doldurur ardından ekrana içerik gelir.

- Server side rendering yöntemi uygulanan bir sayfaya girdiğimizde `js kodu` `sunucuda` çalışır ve html `sunucuda` oluşur. Client tarafı sunucudan `dolu html`'i indirip ekrana basar.

## SSR FAYDALARI

- JS kodu kendi bilgiisayarımda/telefonumuzda değilde çok daha güçlü olan bir bilgisayarda yani sunucuda çalıştığı zaman daha hızlı sonuç üretir yani sayfa yüklenme süresi daha kısa olur

- SEO açısından dolu html dosyası indirmek önemlidir bu sayede google'ın sitemizi analiz eden robotları sayfa içeriğini boş olduğunu zannedip bizi alt sıralara atmak yerine html dosyası üzeirnden sayfayıo analiz edip asıl içeriği anlayabiliyor ve daha üst sıralarda öneriyor.

## Nasıl Server veya Client'da render ederiz

- Nextjs'de iki farklı component türü vardır.
- Server Component: İçerğini server'da render eder.
- Client Component: İçeriğini client'da render eder.

- Next.js biz aksini belirtmedikçe oluşturduğumuz bütün componentlar server component olarak tanımlanır. Eğer bileşenin üst kısmına "use client" yazarasak o component client component olarak tanımlanır.

- Next.js bizden olabildiğince çok server component kullanamamızı ister. (Hız - Seo)

- Her component'ı server component yapamıyoruz. Kullanıcı etkileşimi gerektiren component'lar mecburen client comp olmalı. React hook'larını kulladığımız comp'lar client comp olmalıdır.

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cache'de tutar ve veriyi çeken fonksiyonu belirli bir süre içerisinde tekrar çalıştırığımızda api'dan veriyi almak yerine önceki istekten gelen ve cachede tutulan veriyi alır.

- Bu sayede:
- - api'dan cevap beklemek gerekemez > daha hızlı
- - api'a gereksiz istek gitmez > daha az maliyetli

- Cache özelliği sayesinde api'dan gelen veriyi birden fazla sayfa veya bileşende kullanmak istiyorsak redux/context yapılarına gerek duymadan bütün bileşenlerden api isteği atabiliriz.

# Next.js Methodları

## useRouter

- Sadece `client` component'larda kullanılır.
- Proje içerisinde yönlendirme yapmak için kullanılır.
- back() | forward() | refresh() | push() | methodları vardır

## redirect

- Sadece `server` component'larda kullanılır.
- Yönlendirme yapmak için kullanılır.

## notFound

- Hem `client` hemde `server` component'larda kullanılır.
- 404 sayfasını ekrana basmak için kullanılır

## usePathname

- Sadece `client` component'larda kullanılır.
- Kullanıcı bulunduğu yolu url'de alır ve döndürür.

## useParams

- Sadece `client` component'larda kullanılır.
- urldeki path parametlerini alır ve dönrürür.

## useSearchParams

- Sadece `client` component'larda kullanılır.
- urldeki arama parametlerini alır ve dönrürür.

## generateStaticParams

- Next.js 13 ve sonrasında App router ile birlikte kullanılır.
- Dinamik sayların statik olarak oluşturulmasını sağlar.
- generateStaticParams, build sırasında çağrılan dinamik rotalar için statik bir paramatre listesi döndürür. Next.js'de bu listedeki herbir parametre için o detay sayfasının statik bir versiyonunu oluşturur.

- generateStaticParams() > [{id:1},{id:2},{id:3}]
- yukarıdaki dizideki her bir id değeri için detay sayfasının statik bir versiyonu oluşturulur
- Sadece dinamik sayfalarda kullanılır.

## Form

- Kullanıcının arattığı kelimeyi urle parametre olarka ekler aynı zamanda kullanıcyı /search adresine yönlendirir

```html
<form action="/search">
  <input name="query" type="text" />

  <button type="submit">Gönder</button>
</form>
```

# BACKEND

## Server Action

- Client ve Server componentları içerisinde doğrudan backend kodu (User.findByIdAndDelete()) çalıştırmak istersek kullanırız.

- Server tarafında yazılan kodu frontend tarfında yazabilmek için server componentlar backend kodunun yazılcağı fonksiyonun üstüne `use server` client componentlarda ise dosyanın en üstüne `use server` ibaresi eklereye backend kodlarını componentlar içersiinde yazabiliyoruz

## Backend Routing

- Backend'de routing kavramı endpoint tanımlamaya denk gelir:

- GET /products > ürünleri verir
- GET /products/[id] > ürün detayını verir
- GET /users > kullanıcı veilerini veirir
- POST /users > yeni kullanıcı ekler

- Next.js'de backend yollarınıda frontend'de tanımladığımız gibi klasör yapısı aracılığı ile tanımlayabiliyoruz.

- Öncelikle bir api klasörü oluşturmalyız.
- api klasörünün içerisinde oluşturuğumuz ve içerisinde `route.js` dosyası olan her klasör bir endpoint tanımına denk gelir

- Route.js dosyalarında hangi HTTP isteklerine cevap vericeksek o `HTTP methodu isminde bir fonksiyon` yazılır
