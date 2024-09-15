const defaultRequest = (req, res) => {
  // cevab'ın durum kodunu belirle
  res.statusCode = 404;

  // cevaba göndericek içeriğin tipini header olarak ekl
  // res.setHeader("Content-Type", "application/json");

  // cevab'ın içeriğini belirlie
  res.write(JSON.stringify({ message: "İstek adresi tanımsız" }));

  // cevab'ı client'a gönder
  res.end();
};

module.exports = defaultRequest;
