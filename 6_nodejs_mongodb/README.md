# Mongoose

- Node.js ortamında MongoDB veritabanının methodalrını kullanamamızı sağlayan bir kütüphanedir.
- ODM (Object Data Modeling) kütüphanesi olarak geçer.

## Mongoose Temel Özellikleri

1. Şema Tanımlama
2. Modelleme
3. Doğrulama (Validation)

# Enviroment Variables

- Ortam / Çevre Değişkenleri

- Projeyi paylaşırken admin şifresi / veritabanı bağlantı url / apikey gibi hasas bilgileri githuba göndermek istemeyiz.

- Bu noktada projenin çalışması için gerekli olan ama github'a yüklemek istemedğimiz değişkenler var ise env dosyasında bu değişkenler saklanmalı.

- .gitignore dosaysına .env dosyası eklenerek bu dosyasnın githuba gönderilmesi engellenmeli

# Operatörler

- gt (>): greather than
- gte (>=): greather than or equals
- lt (<): less than
- lte (<=): less than or equals
- ne (!=): not equals

# Alias Routes

- Bazı dırımlarda client belirli parametreler ile api'a istek atabilir.
- Bu parametrelerin sayısı fazla olcauğı bazı seneryolarda parametre ekleme işlemini frontende bıramak yerine takma isim olarak oluşturudğumuz bir route ile yapabilir
- Karmaşık ve uzun url'leri daha anlaşılır hale getirmek için kullanılır

# Aggreagate

- Rapor olşturma

# Virtual Property

- Client'a göndeirlmesi gerken ama veritbanında tutulması gereksiz yük oluşturulcak verileri veirtabanında depolayıp göndermek yerine istek anında hesaplayarak göndermeye veirilen isim

# Validators

- 3 çeşit validasyon yani veri doğruluğunu kontrol etmeye yarayan method bulunur.

- 1. Built-In Validators: Mongoose içierisinde gömülü olan methodlar.
- 2. Custom Validators: Kendi yazdığımız doğrulama methodları.
- 3. ThirdParty Validators: Kütüphaneisni indirip kullandığımız methdolar (Validator.js).

# Kullanıcı İşlemleri

## Authentication

- Kimlik doğrulama

## Hash ve Salt

- Hashleme ve saltlama, verilerin güvenli bir şekilde saklnması ve özellikle parolaların korunması için kullanılan tekniklerdir.

- Hashleme, veriyi alıp sabit uzunlukta benzersiz bir diziye dönüştüren matematiksel bir işlemdir.
- Hash fonksiyonları tek yönlüdür, yani oluşturulan hash değeri geri alınamaz
- Aynı girdi her zaman aynı hash çıktısını üretir.
- Denem@123 > sdnb3289@@fıdj23!sdınf45 -----> HASH
- Denem@123 > sdnb3289@@fıdj23!sdınf45 -----> HASH

- Saltlama, hashleme işlemine ekstra güvenlik katmanı eklemek için kullanılır. "Salt", parolaya eklenen rastgele bir dizedir. Salt, her kullanıcı için farklı şekilde oluşturulup, parola ile birleştirildikten sonra hashlenir.
- Denem@123 > rastgeleDenem@123rastgele -----> SALT
- rastgeleDenem@123rastgele > DUSHFYUG23645gdfsuyg235 -----> SALTED HASH

## JWT (Json Web Token)

- Sunucu ve client arasında güvenli bir şekilde bilgi alışverişi yapmak için kullanılır.
- Sunucudan oluşulturulan kullanıcı oturumunun bilgileri bir token şekilde client'a aktarılır.
- Client bunu saklar ve yetki gerektiren her api isteğinde token ile birlikte istek atar bu sayede sunucu tarafında kullanıcı oturumunu doğrulayabiliriz.

- JWT 3 ana bileşen oluşur ve bu bilşenler (.) birbirinden ayrılır.
- Header (Başlık)
- Payload (Veri)
- Signature (İmza)

* Header:
* - Algoritma: Tokenin imzalanmasında kullanılan algoritmayı belirtir (HMAC, SHA256 ,RSA)
* - Tip: Tokenin türünü belirtir (JWT)

* Payload:
* - Payload token içerisinde taşınacak olan bilgileri içerir. Bu bilgiler genellikle kullanıcının kimlik bilgileri veya yetkilendirme detayları (role) olur.
* - Bizim girdiğimiz değerler dışarısında iss ve exp değerleride bulunur.

* Signature:
* - Header ve payload'ın doğruluğunu ve bütünlüğünü sağlamak için kullanılır.
* - İmza, header be payload'In birleştirilmesiyle oluşan string'in bir algoritma ve bir gizli anahtar kullanılarak şifrelenmesiyle elde edilir.

## Cookies

- Çerezler, bir web sitesinin kullanınının tarayıcısınında küçük veriler saklamasına olanak tanıyan metin tabanlı küçük bir dosyadır.

## Neden JWT'yi Doğrudan Gödnermek Yerine Coookie Olarak Göndermeliyiz

- 1. Daha Güvenli bir depolama: saldırlara karşı daha dayanıklı
- 2. Otomatik Gönderim: Cookie olarak saklanılan veri client'ın api'a yaptığı her istekde ototmatik olarak api'a gönderilir.

## Authorization

- Bir kullanıcının sistemin belirli kaynaklarına erişimini kontrol etme sürecidir.
- Yetkilendirme, kimlik doğrulama sürecinden sınra uyguladığımız süreçtir.
- Kimliğini doğruladığımız kullanıcnın eylemleri yapıp yapamayacağını belirleriz.
- Örn:
- getAllTours endpointine henüz oturum açmamış kullanıcılar bile erişebilmeli
- createTour endpointe erişbilmek için hem oturumunun açık olmasını hemde yeterli rolünün olması gerekir
- getTourStats endpointe erişbilmek için hem oturumunun açık olmasını hemde admin rolünün olması gerekir

## Şifre Değiştirme

- şifremi unuttum
- şifreyi biliip değiştirme

## Mail Gönderme

- nodemailer
- mailtrap

# Node.js API'ya Karşı Yapılabilecek Saldırı Türleri ve Alınabilecek Önlemler

## Compromised Attack

- Güçlü bir şekilde hashleme ve saltlama yapılmalıdır.
- Şifrelenmiş şifre saklama tokenleri güvenli bir şekilde korunmalıdır.
- Kullanıcıların güçlü şifreler yazmasını sağlayacak mekanizmalar kullanılmalıdır.

## Brute Force Attack

- Kullanıcıların güçlü şifreler yazması teşvik edilmelidir.
- Deneme hakkı sınırlandırılmalıdır.
- İstek hız limiti uygulanmalıdır.
- CAPTCHA doğrulaması eklenmelidir.
- İki faktörlü kimlik doğrulama kullanılmalıdır.
- Belirli bir deneme sonrası hesap kilitlenebilir.

## XSS (Cross-Site Scripting)

- JWT tokenlerinin sadece HTTPS üzerinden seyahat edebilmesi sağlanmalıdır.
- Özel HTTP header'ları eklenmelidir.
- Input olarak gönderilen verilerin içinde JS kodu olmadığından emin olunmalıdır.
- Zararlı URL parametreleri engellenmelidir.

## DoS (Denial of Service) ve DDoS

- Bir IP adresinden belirli bir süre içinde gelebilecek maksimum istek sayısı belirlenmelidir (rate limiting).
- Güvenlik önlemleri olarak aşağıdakiler kullanılabilir:
  - Firewall
  - Load balancer
- Anormal trafik tespiti yapan araçlar kullanılmalıdır (örneğin: Wireshark, Nagios, Splunk).

## NoSQL / SQL Injection

- Input ve parametre girdilerinin SQL veya NoSQL veritabanı komutları içermemesi sağlanmalıdır.
- Girişlerin sanitizasyonu için uygun kütüphaneler kullanılmalıdır.

## Genel Önlemler

- Her zaman HTTPS kullanılmalıdır.
- Tokenlerin geçerlilik süreleri belirlenmelidir.
- Hata bilgileri detaylı bir şekilde frontend'e gönderilmemelidir.
- Önemli işlemler öncesinde doğrulama yapılmalıdır.
- Hesap oluştururken e-posta doğrulaması yapılmalıdır.

# Data Modeling

- Data modeling, veri yapılarının, kısıtlamalarını, ilişkilerinini ve diğer unsurları tanımladığımız sürece verilen isimdir. Bu süreç projenin ihtiyaçlarını karşılama adına veritabanı tasarımını planlamak için kullanılır. Amaç, karmaşık veri setlerinin daha anlaşılabilir, düzenli, erişlebilir bir şekilde organize edilmesini sağlamaktır.

## Aşamalar

1. Gereksinim Analizi

- - Uygulanım hangi veirlerle çalışıcağı belirlenir
- - Verilerin nasıl kullanılavağı ve hangi sorguların yapılacağı analiz edilir.

2. Varlıkların Tanımlanması

- - Veritabanında temsil edilecek nesneler belirlenir (Ürünler, Siparişler, Kullanılcılar)
- - Her nesnenin özellikleri belirlenir (ad, eposta, şifre)

3. İliişkilerin Tanımlanması

- - Verilerin arasındaki işişkiler belirlenir (Sipariş nesneinde kullanıcı verisi olmalı)
- - İlişki türleri belirlenir.
- - - One To One
- - - One To Many
- - - Many To Many
- - - Refferencing
- - - Embedding

4. Performans Optimizasyonu Ve Indeksleme

- Sık yapılan sorgularda indeksleme yapılır.
- Veri modeli sorgu performansını arttırcak şekilde optimize ederiz.

# Veritabanı Modellerindeki İlişkiler

- One to One (1:1): Bir kolleksiyondaki her bir kayıt diğer kolleksiyondaki tek bir kayıt ile ilişkilendirilir.

- One to Many (1:many): Bir kolleksiyondaki her bir kayıt diğer kolleksiyondaki birden çok kayıt ile ilişkilendirilir.

- Amny to Many (many:many): Bir kolleksiyondaki birden çok kayıt diğer kolleksiyondaki birden çok kayıt ile ilişkilendirilir.

# Veriler Arasında Kurulan İlişkiler

1. Refferancing (Referans) / Normalization:

- Referans, belirli belegedeki veriler bir başka belgeye referans (id) kullanılarak ilişkilendirmeye yarar. Yani iki belge arasında ilişki vardır ancak gerçek veri bir belegede saklanırken diğer belgede sadece gerçek verinin referansı bulunur.

2. Embedding (Gömme) / Denormalization:

- Belirli belgenein içerisindeki verileri diğer belgelere doğrudan gömülü olarak tanımlamaya yarar

# Hangi Durumda Hangisini Kullanıcaz

----------------------------- Embedding --------------------------- Reffernecing ----------------------

1. İlişki Tipi 1:FEW, 1:MANY, 1:1 1:MANY, 1:TON, MANY:MANY, 1:1

2. Erişim Durumu Okuma daha yüksekse Yazma oranı yüksekse
   veri çok değişmiyorsa veri çok güncelleniyorsa

# Populate

- `populate`, mongoose kullanarak bir mongodb belgesi sorguladığımızda, o belgenin içersinde referans olarak verilen başka bir kolleksiyondaki belgeleri otomoatik olarak doldurmamızı sağlayan yöntemdir. SQL'deki JOİN methoduyla benzer bir görev yapar. Referans olarak tanımladığımız idleri asıl veri kayıtlarıyla doldurur.
