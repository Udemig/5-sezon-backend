const amqp = require("amqplib");
const Product = require("./product.model");

// Business Logic'i yöneticek ve veritbanı ile iletişime geçicek
class ProductService {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.initializeRabbitMq();
  }

  async initializeRabbitMq() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(process.env.RABBITMQ_PRODUCT_QUEUE);

      // products kuyruğuna gelen mesajları dinle
      this.channel.consume(process.env.RABBITMQ_PRODUCT_QUEUE, async (data) => {
        try {
          // kanaldan gelen mesaja eriş
          const orderData = JSON.parse(data.content.toString());
          console.log("products kanaluna gelen mesaj", orderData);

          // stock'ları güncelelyicek methodu çalıştır
          await this.processOrder(orderData);

          // kuyuruğua işlemin başarılı olduğunu bildir
          this.channel.ack(data);
        } catch (error) {
          // kuyuruğua işlemin başarısız olduğunu bildir
          this.channel.nack(data);
        }
      });

      console.log("RabbitMQ'ya bağlandı");
    } catch (error) {
      console.error("RabbitMq'ya bağalanamadı", error);
    }
  }

  // sipariş edilne her ürünü için stock eksiltir
  async processOrder(orderData) {
    const { products } = orderData;

    for (const product of products) {
      await this.updateStock(product.productId, -product.quantity);
    }
  }

  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(query = {}) {
    try {
      const filter = { isActive: true };

      if (query.title) filter.name = { $regex: query.title, $options: "i" };
      if (query.category) filter.category = query.category;
      if (query.minPrice) filter.price = { $gte: query.minPrice };
      if (query.maxPrice) filter.price = { ...filter.price, $lte: query.maxPrice };

      return await Product.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id, quantity) {
    try {
      // ürün yoksa hata gönder
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Ürün bulunamadı");
      }

      // stock 0'ın altındaysa hata gönder
      const newStock = product.stock + quantity;
      if (newStock < 0) {
        throw new Error("Yetersiz stock");
      }

      // veritbanına yeni stockları ekle
      return await Product.findByIdAndUpdate(id, { $inc: { stock: quantity } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
