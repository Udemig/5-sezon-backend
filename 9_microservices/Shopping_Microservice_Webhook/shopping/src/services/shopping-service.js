const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // sepetteki ürünleri al
  async GetCart(_id) {
    try {
      const cartItems = await this.repository.GetCart(_id);
      return FormateData(cartItems);
    } catch (error) {
      throw error;
    }
  }

  // sepeti yönet
  async ManageCart(customerId, item, qty, isRemove) {
    try {
      const cartResult = await this.repository.UpdateCart(customerId, item, qty, isRemove);

      return FormateData(cartResult);
    } catch (error) {
      throw error;
    }
  }

  // diğer servislerden gelen habere göre fonksiyon çalıştır
  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  // gönderilcek haber nesnesini hazırlayan fonksiyon
  GetOrderPayload(userId, order, event) {
    if (order) {
      const payload = {
        event,
        data: { userId, order },
      };

      return FormateData(payload);
    } else {
      throw new Error("Sipariş verisi bulunamadı");
    }
  }
}

module.exports = ShoppingService;
