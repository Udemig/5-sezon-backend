const { OrderModel, CartModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId }).populate("items.product");
      return orders;
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Orders");
    }
  }

  // Ürünlerin sepetten temizlenmesi gerekiyor
  async CreateNewOrder(customerId, txnId) {
    try {
      const cart = await CartModel.findOne({ customerId });

      console.log("CART", cart);

      if (cart) {
        let amount = 0;

        let cartItems = cart.items;

        console.log("CART ITEM", cartItems);

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          cart.items = [];

          const orderResult = await order.save();

          await cart.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Category");
    }
  }

  // sepetteki ürünleri veritabanından al
  async GetCart(customerId) {
    try {
      const cartItems = await CartModel.find({ customerId });

      if (cartItems) {
        return cartItems;
      } else {
        throw new Error("Sepette ürün bulunamadu");
      }
    } catch (error) {
      throw error;
    }
  }

  // sepete yeni ürün ekler
  async UpdateCart(customerId, item, qty, isRemove) {
    const cart = await CartModel.findOne({ customerId });
    const { _id } = item;

    if (cart) {
      // Kullanıcının mevcut sepetini güncelle
      let isExist = false;
      let cartItems = cart.items;

      console.log("(1)==cartItems==", cartItems);
      console.log("(1)==item==", item);

      if (cartItems.length > 0) {
        cartItems = cartItems
          .map((cartItem) => {
            if (cartItem._id.toString() === _id) {
              if (isRemove) {
                return null; // Null olarak işaretleyerek elemanı kaldıracağız
              } else {
                return { ...cartItem, unit: qty }; // Ürünün miktarını güncelle
              }
            }
            return cartItem;
          })
          .filter(Boolean); // Null olan elemanları temizle
      }

      console.log("(2)==cartItems==", cartItems);
      console.log("(2)==item==", item);

      if (!isExist && !isRemove) {
        cartItems.push({ product: item, unit: qty }); // Burada sadece `_id` yerine `item` tamamını saklıyoruz
      }

      console.log("(3)==cartItems==", cartItems);
      console.log("(3)==item==", item);

      cart.items = cartItems;
      return await cart.save();
    } else {
      console.log("(ELSE)==item==", item);
      // Kullanıcı için yeni bir sepet oluştur
      return await CartModel.create({
        customerId,
        items: [{ product: item, unit: qty }], // Ürünün tamamını kaydet
      });
    }
  }
}

module.exports = ShoppingRepository;
