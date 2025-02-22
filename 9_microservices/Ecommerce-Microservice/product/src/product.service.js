const amqp = require("amqplib");

// Business Logic'i yöneticek ve veritbanı ile iletişime geçicek
class AuthService {
  constructor() {
    this.channel = null;
    this.initializeRabbitMq();
  }

  async initializeRabbitMq() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await connection.createChannel();
      await this.channel.assertExchange(process.env.RABBITMQ_EXCHANGE, "topic", { durable: true });
      await this.channel.assertQueue(process.env.RABBITMQ_QUEUE);
      console.log("RabbitMQ'ya bağlandı");
    } catch (error) {
      console.error("RabbitMq'ya bağalanamadı", error);
    }
  }

  static async register() {}
  static async login() {}
  static async refresh() {}
  static async logout() {}
}

module.exports = new AuthService();
