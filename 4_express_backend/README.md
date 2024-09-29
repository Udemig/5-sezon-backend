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

## Expresss Backend Endpoints

- GET `/api/v1/cars` > Bütün araç verilerini al
- GET `/api/v1/vehicles` > Bütün araç verilerini al
- POST `/api/v1/cars` > Yeni araç ekle

- GET `/api/v1/cars/ID` > ID'si bilenen araç verisini al
- PATCH `/api/v1/cars/ID` > ID'si bilenen araç verisini güncelle
- DELETE `/api/v1/cars/ID` > ID'si bilenen araç verisini sil

## APIDA GÜNCELLEME YAYINLADI

- GET `/api/v2/vehicles` > endpoint ismi değişti

# Frontend

fetch(`/api/v1/cars`)
.then(ekrana basıcak)
.catch(hata göster)

# Mobil

fetch(`/api/v1/cars`)
.then(ekrana basıcak)
.catch(hata göster)

- Bu seneryoda fronte ve mobil geliştiricsi ugyulamarını güncelleyene kadar uygularmalr çökücek

- Bu seneryoda fronte ve mobil geliştiricsi ugyulamarını güncelleyene kadar uygulamarl ayakata kalmaya devam edicek sadece api'ın eski versiyonundaki verileri kullanıcak

<img src="./video.gif" />

![](./src/assets/amazonApp.gif)
