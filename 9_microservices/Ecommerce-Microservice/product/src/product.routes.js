const express = require("express");
const productController = require("./product.controller");
const { authenticate, admin } = require("./product.middleware");

const router = express.Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.getProduct);
router.post("/", authenticate, admin, productController.createProduct);
router.put("/:id", authenticate, admin, productController.updateProduct);
router.put("/:id/stock", authenticate, admin, productController.updateStock);
router.delete("/:id", authenticate, admin, productController.deleteProduct);

module.exports = router;
