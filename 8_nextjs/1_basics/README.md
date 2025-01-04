# Routing

- Next.js'de güncel sürümlerde önerilen ve tercih edilem routing yöntemi `App Router`'dır. Ama eski sürümde yazılan projelerde `Pages Router`'la karşılaştırınız.

# App Router

- React projelerinde react-router-dom kütüphanesiyle yaptığımız sayfalamayı next.js'de next'in kendine has yöntemiyle yaparız.
- Dosya dizinine göre / klasör tabanlı sayfalama vardır.
- Bütün sayfalar src/app klasörü içerinde tanımlanır
- App içerisinde tanımlanan ve içinde page.jsx dosyası olan bütün klasörler bir sayfaya denk gelir.
- Her page dosyasında bir reeact component'ı export edilmeli.
- Url'deki route'un ismi klasörün ismine göret tanımlanır

## Nested Routes - İç İçe Yollar

- örn:
- /profile > profilini görüntüle
- /profile/friends > arkadaşlarını görünütüle
- /profile/edit > profilini düzenle

- nested routes oluştururken bir child (alt) route oluşturmak için sadece bir sayfa klasörü içerisine içinde page.jsx dosyası olan bir klasör daha oluştururuz.

## Dynamic Routes - Dinamik Yollar

- Bir e ticaret projesi yapıyorsak yüzlerce ürün olduğundan dolayı ürün detay sayfasını dinamik yani url'deki parametreye göre değişecek şekilde ayarlarız.

- Youtube > Video Detay Sayfası
- Amazon > Ürün Detay Sayfası
- Netflix > Film Sayfası

- - örn: /products/20
- - örn: /products/99

## Nested Dynamic Routes - İçe İçe Dinamik Yollar

- örn: /products/20 > ürün detay sayfası
- örn: /products/20/reviews > ürün'ün yorumlar sayfası
- örn: /products/20/reviews/34 > yorum detay sayfası

## Catch All Segments

- Bir route'da birden fazla parametre olduğu zaman kullanılan bir yöntemdir

- /docs/belge-1

- /docs/belge-1/sayfa-4

- /docs/belge-1/sayfa-4/satır-10

- Yukarıdaki örnektee dökümanlar yolumnda 3 farklı parametre vardır 1.parametre hangi belgenin görüntüleneceğini 2.parametre belgedeki kaçıncı sayfanın görüntülüneceğini 3. parametre ise kaçıncı satırın ekrana basılcağını belirler

## Undefined Page

- Varsayılan olarak tanımlanmayan bir sayfaya gittiğimizde çıkan 404 sayfası bulunsada istersek bunu özelleştirebiliyoruz

- Özelleştirmek için /src/app klasörü içerisine not-found.jsx dosyası oluşturmamız gerekli

- Bu dosyayı oluşturursak varsayılan undefined sayfası devre dışı kalır ve bizim oluşturduğumuz devreye girer.

- Eğer farklı bir route içerisinde kullanıcyı bu sayfaya yönlendirmek istersek `notFound` fonksiyonunu kullanırız

# Route Group - Yol Gruplandırma

- Proje içerisindeki sayfaları gruplandırmak isteyebiliriz.

- Yazdığımız sayfların daha kolay erişilebilir olması için route'ları gruplandırmak isteyebiliriz.

- Nested routes'dan farklı olarak url'e etki etmez.

- (Auth)
- - Login.jsx
- - SignUp.jsx
- - ForgotPass.jsx

## Metadata

- Seo açısından her sayfa için metadata'ları tanımlamak önemlidir.

- Sayfaların metadata dediğimiz tarayıcıda öne çıkması için ihtiyacı olan başlık / açıklama / llogo / yapımcı gibi değerleri react'da sabit olarak index.html'de tanımlayabilirken next.js'de bu metadataları her sayfaya özel şekilde tanımlayabiliyoruz.

- Bir sayfa için metadata tanımlamak istiyorsak o sayfanın dosyasında bir metadata isimli nesne oluşturmak ve export etmek gerekli

- Dynamic sayfalarda metada'nında dinamik olmasını isteyebiliriz. Örneğin Ürün-10 gibi bir başlık isteyebiliriiz ve bu 10 sayısı url'deki parametreye göre değişir. Bu tarz durumlarda sabit bir metadata nesnesi oluşturmak yerine onu oluşturucak bir genrateMetadata() fonksiyonu kullanırız

## Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynını belirlemek için kullandığımız bileşendir.

- Bir sayfa grubunun ortak olarak kullancığı bileşenleri layout'a tanımlayıp kod tekrarını önleyebiliyoruz.

- Root Layout'a yaptığımuz değişiklikler bütün sayfaları etkiler. Ama sadece birkaç sayfanın ortak layoutunu belirlemek istersek o sayfa grubuna özel laout dosyası açarız

- Layout component'ları o sayfa grubundaki ekrana basılan sayfayı children propu olarak alır.

## Template

- Layout ile aynı mantıkla ve aynı yöntemle kullanılır.
- Layout'dan tek farkı sayfa geçişlerinde tutulan state sıfırlanır

## Özel Dosyalar

- page.jsx
- layout.jsx
- template.jsx
- not-found.jsx

- loading.jsx
- - bir bileşen await ile promise'i beklediği süre boyunca otomatik olarak ekrana gelir

- error.jsx
- - bir bileşende hata fırlatıdğı durumda devreye girer
- - prop olarak gelen hatanın bilgilerini ve sayfaya tekrar render etmeye yarayan methodu alır
- - error component'ı client component olmalı

## SSG - Static Site Generation

- Static Site Generation, Next.js ile kullanılan bir sayfa oluşturma yöntemidir. Sayfların _build_ sırasında önceden oluşturulmasını ifade eder. Bu, her istekte sunucnun dinamik bir şekilde sayfa üretmek yerine, satatik olarak oluşturulmuş sayfaları kullanıcıya sunması anlamına gelir.

- Sayfalar build sırasında oluşturulur ve bir kez üretildikten sonra statik dosyalar olarak saklanır.

- Kullanıcılar bu statik dosyalara doğrudan erişir.

- Sayfalar önceden oluşturulacağı için tarayıcı botları sayfları tarayabilir, bu SEO avantajı sağlar

- Hangi sayfların static olucağına nextjs kendi karar verir.

- Dynamic Page
- Dinamik sayfalar her sayfayı açtığımızda sunucu tarafından tekrar oluşturulur
- Sayfa içeriğinin, istek anındaki parametrelerle veya dış kaynaklardan alınan verilere göre değişebilir.
