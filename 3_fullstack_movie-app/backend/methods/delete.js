const fs = require("fs");

const deleteRequest = (req, res) => {
  // url'in temel adresini değişkene aktar (sondaki param dışarısnında kalan)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // url'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  if (path === "/api/movies" && id) {
    // bütün filmleri al
    const data = JSON.parse(
      fs.readFileSync("./data/movies.json", "utf-8")
    );

    // parametre olarak gelen id'li film dizi var mı ara
    const isFound = data.movies.find((i) => i.id === id);

    // yoksa id geçersiz hatası gönder
    if (!isFound) {
      res.writeHead(404);
      return res.end("Gönderilen id'li eleman bulunamadı");
    }

    // diziden id'si bilinen filmi kaldır
    const filtred = data.movies.filter((i) => i.id !== id);

    // json dosyasına yeni diziyi aktar
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtred));

    // client'a cevap gönder
    res.writeHead(204);
    return res.end();
  }
};

module.exports = deleteRequest;
