const express = require("express");
const orderController = require("./order.controller");
const { authenticate, admin } = require("./order.middleware");

const router = express.Router();

router.post("/", authenticate, orderController.createOrder);

router.get("/:orderId", authenticate, orderController.getOrder);

router.get("/user/:userId", authenticate, orderController.getUserOrders);

router.patch("/:orderId/status", authenticate, admin, orderController.updateOrderStatus);

module.exports = router;
