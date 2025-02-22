const ProductService = require("./product.service");

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      res.status(200).json({ message: "Başarılı" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
