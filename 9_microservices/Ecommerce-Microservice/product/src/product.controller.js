const { validateDto, productSchema } = require("./product.dto");
const ProductService = require("./product.service");

class ProductController {
  async createProduct(req, res, next) {
    try {
      // client'tan gelen datayı kontrol et
      const productData = await validateDto(productSchema, req.body);

      // veritbanına ürünü kaydet
      const product = await ProductService.createProduct(productData);

      // client'a cevap gönder
      res.status(201).json({ product });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      // arama parametreleri ile gelen değerlere erişelim
      const query = {
        title: req.query.title,
        category: req.query.category,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };

      // servis katmanında veritabanından verilieri al
      const products = await ProductService.getAllProducts(query);

      // hiç ürün yoksa:
      if (products.length < 1) {
        return res.status(404).json({ message: "Aranaılan kriterlere uygun ürün bulunamadı", products: [] });
      }

      // ürünler bulunduysa:
      res.status(200).json({ results: products.length, products });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductService.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Ürün bulunamadı" });
      }

      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedProduct = await ProductService.updateProduct(id, updateData);

      if (!updatedProduct) {
        return res.status(404).json({ error: "Ürün bulunamadı" });
      }

      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== "number") {
        return res.status(400).json({ error: "Miktar, sayı değerinde olmalı" });
      }

      const updatedProduct = await ProductService.updateStock(id, quantity);

      res.status(200).json({ stock: updatedProduct.stock, product: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deletedProduct = await ProductService.deleteProduct(id);

      if (!deletedProduct) {
        return res.status(404).json("Ürün bulunamadı");
      }

      res.status(200).json({ message: "Ürün başarıyla silindi" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
