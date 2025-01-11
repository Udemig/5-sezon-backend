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
