const http = require("http");

// bir http sunucusu oluştur gelen isteklere cevap ver
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    // durum kodu ve header belirle
    res.writeHead(200, { "Content-Type": "application/json" });

    // cevap gönder
    res.end(JSON.stringify({ message: "Serverdan merhabalar" }));
  }

  if (req.url === "/new" && req.method === "POST") {
    res.writeHead(201, { "Content-Type": "application/json" });

    res.end(JSON.stringify({ message: "Ürün oluşturuldu" }));
  }
});

// port 3001'e gelen istekleri dinle
const port = 3001;
server.listen(port, () => {
  console.log(`Server ${port}. port'a gelen istekleri dinliyor`);
});
