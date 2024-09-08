// API: Gelen istekleri izler ve isteklere cevap gönderir.

// http modülünü çağırdık
const http = require("http");

/*
 * createServer(), veridğimiz dinleyici fonksiyonu api'a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
  
 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.
 */

/*
 * TODO
 * Routing
 * API'a gelen isteğin hangi endpoint (uç nokta / yol)'e geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir
 * Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
 */

const server = http.createServer((request, response) => {
  console.log("🥳🥳 API'a istek Geldi 🎉🎉");

  // gelen isteğin methodunu konsola yazdır
  console.log(request.method + " isteği geldi");

  // gelen isteğe gönderilecek cevap
  response.end("Server tarafindan selamlar!!!");
});

// Bir dinleyeci oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz
server.listen(3535, "127.0.0.1", () => {
  console.log(
    "🎾 IP adresinin 3535 portuna gelen istekler dinlemeye alındı"
  );
});
