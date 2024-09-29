# HTTP Server vs Express Farkları

1. Routing:

- HTTP Modülü: Yolları manuel olarak kontrol ederiz. `req.url`'i koşullar içerisinde kontrol ederek endpoint tanımı yaparız. Küçük projelerde biryere kadar idare etsek bile orta ölçekli bir projeyi bu yöntemle geliştirmek kod karmaşıklığına / tekrarına yol açar.

- Express: `app.get("/",fn)` veya `app.post("/todos",fn)` gibi methodlar ile hangi http methodu ile hangi yol istek atıldığında çalışması gereke nfonksiyonları belirlyeniliyorsunuz

2. Middleware (Arayazılım):

- HTTP Modülü: Ara yazılım doğrudan yoktur benzeri bir işlevsellik manuel olarak sağlanabilir.

- Express: Entregre bir arayazılım sistemine sahiptir ve uygulamda günlekmle, kimlik doğrulama vb. olayları yönetmek oldukça pratıl bir hal alır

## Örnek

- `/` adresine yapılan get isteğine cevap gönderen
- `/new` adreisne yapılan post isteğine cevap gönderen
- bir API'ı hem http modülü ile hem express ile yazalım
