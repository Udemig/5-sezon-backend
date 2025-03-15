# Blog API Postman Koleksiyonu

Bu dosya, Blog API projesinin Postman üzerinden nasıl test edileceğini açıklar.

## Kurulum

1. Postman uygulamasını açın
2. **Dosyalar** > **Import** seçeneğine tıklayın
3. Bu dizindeki `postman_collection.json` ve `postman_environment.json` dosyalarını içe aktarın

## Ortamın Ayarlanması

1. Sağ üst köşedeki ortam seçiciden "Blog API Ortamı"nı seçin
2. API'nizin çalıştığı URL'i kontrol edin, varsayılan olarak `http://localhost:3000` ayarlanmıştır

## API Endpoint'lerini Test Etme

### Kimlik Doğrulama

1. Önce "Kayıt Ol" endpoint'ini kullanarak bir kullanıcı hesabı oluşturun
2. Ardından "Giriş Yap" endpoint'ini çalıştırın - bu otomatik olarak token'ları environment değişkenlerine kaydedecektir
3. Token'lar kaydedildikten sonra, kimlik doğrulama gerektiren diğer endpoint'leri test edebilirsiniz

### Token Yenileme

- Access token'ın süresi dolduğunda, "Token Yenile" endpoint'ini kullanarak refresh token ile yeni bir access token alabilirsiniz
- Bu işlem de otomatik olarak yeni token'ı environment'a kaydedecektir

## Testleri Çalıştırma

- Koleksiyondaki tüm endpoint'leri test etmek için koleksiyon adına sağ tıklayıp "Run collection" seçeneğini kullanabilirsiniz
- Belirli bir klasördeki endpoint'leri test etmek için klasör adına sağ tıklayıp "Run folder" seçeneğini kullanabilirsiniz

## Token Saklama Scriptleri

Koleksiyon, token'ları otomatik olarak saklamak için test scriptleri içerir:

- "Giriş Yap" endpoint'i, access token ve refresh token'ı environment'a kaydeder
- "Token Yenile" endpoint'i, yeni access token'ı environment'a kaydeder

Bu scriptler sayesinde, kimlik doğrulama token'larınızı manuel olarak kopyalayıp yapıştırmanıza gerek kalmaz.
