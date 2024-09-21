const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");
const defaultRequest = require("./methods/default");

// 1) server oluştur
const server = http.createServer((req, res) => {
  // bütün cevaplara eklenicek ortak veri tipi header'ı ekleyelim
  res.setHeader("Content-Type", "application/json");
  // kaynak paylaşımında sorun yaşaamk için (CORS)
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");

  // gelen isteğin method türüne göre cleint'a farklı cevaplar göndericez.
  // kod kalabalığı olmaması için isteklere cevap gönderen fonksiyonları ayrı dosylarda tanımladık.
  switch (req.method) {
    case "GET":
      return getRequest(req, res);

    case "POST":
      return postRequest(req, res);

    case "DELETE":
      return deleteRequest(req, res);

    default:
      return defaultRequest(req, res);
  }
});

// 2) belirli bir prota gelen istekleri dinle
const port = 4090;

server.listen(port, () => {
  console.log(`🎾 Server ${port}' gelen istekleri dinlemeye başladı`);
});
