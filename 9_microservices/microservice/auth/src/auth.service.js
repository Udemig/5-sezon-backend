const amqp = require("amqplib");
const User = require("./auth.model");
const jwt = require("jsonwebtoken");

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

  generateTokens(user) {
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async register(userData) {
    // aynı email'de kayıtlı kullanıcı var mı?
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email zaten kullanımda");
    }

    // kullanıcıyı oluştur
    const user = new User(userData);
    await user.save();

    // kullanıcının tokenlerini oluştur
    const tokens = this.generateTokens(user);
    user.refreshToken = tokens.refreshToken;

    // kullanıcı verisini güncelle
    await user.save();

    return { user, ...tokens };
  }

  async login() {}

  async refresh() {}

  async logout() {}
}

module.exports = new AuthService();
