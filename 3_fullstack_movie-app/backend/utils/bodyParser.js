// isteğin body kısmındaki veriye erişebilmek için parça parça gelen bütün byte'ları birleştirip fonksiyonun çağrıldığı yere return et

const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // fontend'den body'nin her parçası geldiğinde onu al ve yukarıdaki stringe ekle
      req.on("data", (chunk) => {
        body += chunk;
      });

      // yüklenme bittiğinde json verisini js verisine çevir
      req.on("end", () => {
        // fonksiyonun çağrıldığı yere body içeriğini return et
        resolve(JSON.parse(body));
      });
    } catch (err) {
      // hata oluşursa hatayı döndür
      reject(err);
    }
  });
};

module.exports = bodyParser;
