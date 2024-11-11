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

## Şifre Değiştirme

## Mail Gönderme
