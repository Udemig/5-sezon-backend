const ShoppingService = require("../services/shopping-service");

// Webhook
// Microservice mimarisinde servisler arasında iletişim sağlamamız gereken durumlar olucak.
// Bu durumda farklı servislerden gelen api isteklerinin içeriğine bağlı olarak gerekli methodları çalıştır.

module.exports = (app) => {
  // service'in methodlarını kullanbilmek için instance oluştur
  const service = new ShoppingService();

  app.use("/app-events", async (req, res) => {
    // isteğin body kısmında gelen veriyi eriş
    const { payload } = req.body;

    // gelen isteğe bağlı doğru methodu çalıştırıcak fonksiyonu tetikle
    service.SubscribeEvents(payload);

    console.log("==== Shopping Servise Haber Geldi ====");

    return res.status(200).json(payload);
  });
};
