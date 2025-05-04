# Mac'e Özel Hata

- Mac'te docker ımage oluşturuken ağağıdaki komut ile linux'e uygun oluşturmalıyız
- Mac'te olanlar projenin image build'ini alırken bu komutu kullansın

```cmd
docker buildx build --platform linux/amd64 -t europe-west10-docker.pkg.dev/recipe-app-458710/recipe-api/recipe-api .
```

# Image'ı Artifact Registry'e Göndermeden Önce İsmini Değiştirme

```cmd
docker tag recipe-api europe-west10-docker.pkg.dev/recipe-app-458710/recipe-api/recipe-api
```

# Image'ı Artifact Registry'e Gönderir

```cmd
docker push europe-west10-docker.pkg.dev/recipe-app-458710/recipe-api/recipe-api
```

```

```
