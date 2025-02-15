# Docker

- Docker, uygulamalarımızn hafif, taşınabilir,ölçeklenebilir bir şekilde çalıştırılmasını sağlayaan bir container teknolojisidir. Docker, yalnızca uygulama(api) ve bağımlıklarına sahip (nodejs mongodb rabbitmq), kendi bilgisayrımızdan izole çalışıcak bir sanal makina oluşturur.

## Docker Temel Bileşenleri

1. Docker Engine: Docker container'larını çalıştıran motor.
2. Docker Image (İmaj): Uygulama ve tüm bağımlıklarını içeren bir şablon dosya.
3. Docker Container: Çalıştırlan docker imajı.
4. Dockerfile: Docker imajlarının nasıl oluşturulcağını belirleyen bir dosya
5. Docker Compose: Birrden fazla container'ı yönetmeye yarayan araç
6. Docker Hub: Önceden hazırlanmış docker imajlarının depolandığı github benzeri yapı.

## Docker Avantajları

- Platform Bağımsızlığı: "Bir yerde çalışıyorsa her yerde çalışır"
- Kaynak verimliliği: Sanal makinalar tüm işletim sisitemini yüklemeye gereke kalmadan çalışır.
- Hızlı dağıtım
- Ölçeklenebilirlik
- Deploy'da kolaylık

## Docker Kullanımı

1. Uygulamayı oluşturun
2. Bir docker file oluştur ve içeriğinde uygulamanın nasıl çalışıcağını belirle
3. Bu dockerfile'ı kullanarak bir Docker Image oluştur
4. Docker Image'ı çalıştırarak bir Docker Container oluştur.
5. (Opsiyonel) Docker Hub'a yükle

## Komutlar

- Docker file çalıştırma (imaj oluşturur)
- docker build -t basit-api .

- Docker image çalıştırma (container oluşturur)
- docker run -p 3000:3000 basit-api

- docker huba yüklemek için repo oluşturur
- docker tag basit-api furkanevin/basit-api:latest

- docker huba pushla
- docker push username/proje-isim:sürüm

- projeyi dockerhubdan çekip çalıştırma
- docker run -p 3000:3000 furkanevin/basit-api:latest
