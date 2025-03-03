const { validateDto, orderSchema } = require("./order.dto");
const orderService = require("./order.service");
const OrderService = require("./order.service");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const orderData = await validateDto(orderSchema, req.body);

      const order = await OrderService.createOrder(req.user.userId, orderData);

      return res.status(201).json({ order: order });
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req, res, next) {
    try {
      const { orderId } = req.params;

      const order = await OrderService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Sipariş bulunamadı" });
      }

      res.status(200).json({ order });
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const orders = await OrderService.getUserOrders(req.params.userId);
      res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const updatedOrder = await orderService.updateOrderStatus(orderId, status);

      if (!updatedOrder) {
        return res.status(404).json({ error: "Ürün bulunamadı" });
      }

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Güncellerken bir sorun oluştu" });
    }
  }
}

module.exports = new OrderController();
