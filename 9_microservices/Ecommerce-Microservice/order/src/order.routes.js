const express = require("express");
const orderController = require("./order.controller");

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/:orderId", orderController.getOrder);
router.get("/user/:username", orderController.getUserOders);
router.patch("/:orderId/status", orderController.updateOrderStatus);

module.exports = router;
