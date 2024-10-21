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
