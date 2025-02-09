const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const amqplib = require("amqplib");

const { APP_SECRET } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//! İhtiyaç Yok
// customer api'ına haber ver
module.exports.PublishCustomerEvent = (payload) => {
  axios.post("http://localhost:8000/customer/app-events", { payload });
};

// shopping api'ına haber ver
module.exports.PublishShoppingEvent = (payload) => {
  axios.post("http://localhost:8000/shopping/app-events", { payload });
};

//--------------- RabbitMQ Methodları --------------//

//! kanal oluştur
module.exports.CreateChannel = async () => {
  try {
    // Rabbit mq sunucusu ile bağlantı kur
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);

    // Bir iletişim kanalı oluştur
    const channel = await connection.createChannel();

    // Kanala gelen mesajları kuyruklara dağıtıcak olan exchange'i oluştur
    channel.assertExchange(EXCHANGE_NAME, "direct", false);

    // kanalı return et
    return channel;
  } catch (error) {
    throw error;
  }
};

//! mesaj yayınla
module.exports.PublishMessage = async (channel, key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, key, Buffer.from(message));
    console.log("🏸 Mesaj kuyuruğa gönderildi");
  } catch (error) {
    throw error;
  }
};

//TODO mesajlara abone ol
module.exports.SubscribeMessage = async (channel, key) => {};
