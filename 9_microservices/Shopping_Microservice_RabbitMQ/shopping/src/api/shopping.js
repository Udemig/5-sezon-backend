const { SubscribeMessage, PublishMessage } = require("../utils");
const ShoppingService = require("../services/shopping-service");
const { CUSTOMER_BINDING_KEY } = require("../config");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new ShoppingService();

  // diğer servislerden gelen mesajlara abone ol
  SubscribeMessage(channel, service);

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });

      // customer servisine sipariş haberi verz kullanıcı verisine ürünler eklensin
      const payload = service.GetOrderPayload(_id, data, "CREATE_ORDER");

      // rabbit mq ile mesaj gönder
      await PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload.data));

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetCart(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
