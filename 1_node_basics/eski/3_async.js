// Node.js'te "asenkron" ve "senkron" kavramları işlemlerin ne zmaan ve nasıl çalıştırıldığını ifade eder.

/*
 * Senkron
 * Senkron bir işlem, baştan sona tamamlanana kadar diğer kodların çalışmasını durdururu.
 * Yani işlemi başlattığınızda işlem tamamlanmadan sonraki satı çalışmaz
 * Senkron işlemler özellikle büyük veri işlemleri için bekleme süresini arttırabilir ve prefromansız olumsuz etkiler.
 * Bunun sebebi node js'in tek iş paraçacıklı yapıya sahip olması ve bir senkron işlem devam ederken diğer işlemler beklemek zorunda kalur
 */

/*
 * Asenkron
 * Asenkron işklemler başladıkları anda kod, çalışmaya devam eder.
 * Node.js işlemi arkaplanda yürütür ve tamamlandığında callback fonk. ile sonuç döndürür
 * Asenkron işlemler, node js'in single-thread yapısından dolayı performansını arttır çünkü bir işlem devam ederken diğer işlemleri engelllemeden yürütülebilir
 */

/*
 * Hangi durumda hangisi kullanılır ?
 * Küçük işlemlerde ve beklenin kritik olduğu durumlarda senkron tercih edilir
 * Performansın önemli olduğu, kuullanıcı deneyimini etkilemek istemediğimiz durumlarda asenkron yöntemleri kullanmalıyız.
 * Büyük dosya varsa veya çok fazla girdi / çıktı işlem varsa asenkron yapıyı tercih ediriz.
 */

const fs = require("fs");

// fs.readFile("./data/örnek.txt", "utf-8", (err, data) => {
//   if (err) return console.log("okuma işleminda hata!!! 💥", err);

//   console.log("🎾 Dosya başarıyla okundu", data);
// });

fs.writeFile("./data/output-2.txt", "selamlar", (err) => {
  if (err) return console.log("yazma işleminda hata!!! 💥", err);

  console.log("🎾 Yeni dosya başatıyla oluşturuldu");
});

fs.unlink("./data/bozuk.txt", (err) => {
  if (err) return console.log("silme işleminda hata!!! 💥", err);

  console.log("🎾 Dosya başarıyla silindi");
});

// Okuma işleminin okuma işlemine bağımlı olduğu seneryodada asenkron yapıyı kullanaibliriz

// start txt dosyasını okuyup çindeki dosya isimine erişelim
fs.readFile("./data/start.txt", "utf-8", (err, filename) => {
  if (err) return console.log("okunamadı!");

  // start.txt dosyası içierisnde yazan dosyayı oku
  const sonuc = fs.readFileSync(filename, "utf-8");

  // sonucu konsola yazdır
  console.log("Sonuç", sonuc);
});
