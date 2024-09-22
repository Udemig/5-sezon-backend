const fs = require("fs");

const getRequest = (req, res) => {
  // url'in temel adresini değişkene aktar (sondaki param dışarısnında kalan)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // url'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  // temel url'e istek atılırsa bütün filmleri gönder
  if (req.url === "/api/movies") {
    // 1) json dosyasından filmleri al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    // 2) client'a cevap gönder
    return res.end(movies);
  }

  // yola id eklenirse bir filmi gönder
  if (path === "/api/movies" && id) {
    // 1) json dosyasından filmleri al
    const data = JSON.parse(
      fs.readFileSync("./data/movies.json", "utf-8")
    );

    // 2) url'deki id'ye karşılık gelen elemanı dizide ara
    const movie = data.find((i) => i.id === id);

    // 3) eğerki film bulunursa client'a gönder
    if (movie) {
      return res.end(JSON.stringify(movie));
    }

    // 4) eğer film bulunamazsa hata gönder
    res.writeHead(404);
    return res.end(
      JSON.stringify({ message: "Aranılan film bulunamadı" })
    );
  }

  // yol yanlışsa hata gönder
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Yol bulunamadı" }));
};

module.exports = getRequest;
