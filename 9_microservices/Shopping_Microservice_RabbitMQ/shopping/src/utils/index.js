const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const { APP_SECRET, MESSAGE_BROKER_URL, EXCHANGE_NAME, SHOPPING_BINDING_KEY, QUEUE_NAME } = require("../config");

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

//! mesajlara abone ol
module.exports.SubscribeMessage = async (channel, service) => {
  // bir kuyruk oluştur
  const appQueue = channel.assertQueue(QUEUE_NAME);

  // kuyruğu belirli bir routing key bağla
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, SHOPPING_BINDING_KEY);

  // kuyruktaki mesajlara abone ol
  channel.consume(
    appQueue.queue,
    (msg) => {
      if (msg.content) {
        console.log("Kuyruktan mesaj alındı 🥶");

        service.SubscribeEvents(JSON.parse(msg.content.toString()));
      }
    },
    { noAck: true } // mesaj gelince rabbitMq'ya onay gönder (kuyruktan mesaj kaldırılıyor)
  );
};
