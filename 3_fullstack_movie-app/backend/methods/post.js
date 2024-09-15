const bodyParser = require("../utils/bodyParser");

const postRequest = async (req, res) => {
  if (req.url === "/api/movies") {
    // isteğin body kısmına eriş
    const body = await bodyParser(req);

    // todo gelen veriyi kontrol et
    console.log("gelen body", body);

    res.end("film oluşturuldu");
  } else {
    res.writeHead(404);
    res.end("Geçersiz yola istek atıldı");
  }
};

module.exports = postRequest;
