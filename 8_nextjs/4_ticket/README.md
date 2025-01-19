# Next.js Projesinde MongoDB'ye Bağlanma

## 1. YOL

- Her model dosyasının en üstüne aşağıdaki kodu yazarız.
- Bu yöntemde controller methodlarında ekstra bir işleme gerek kalmaz.
- Ama her yapılan istekte veritbanına tekrar bağlanır.

```js
mongoose.connect("mongo_uri");

mongoose.Promise = global.Promise;
```

## 2. YOL

- Veritbanına bağlanıcak ve cache'i yöneticek bu fonksiyonu tanımlarız.
- Her controller methodunun en üstünde çağırırız.
- Cache kullandığı için daha performanslıdır.

```js
async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}
export default connectMongo;
```
