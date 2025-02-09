const mongoose = require("mongoose");
const { DB_URL } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Veritabanına bağlandı!");
  } catch (error) {
    console.log("Veritabanına bağlanırken hata'");
    console.log(error);
    process.exit(1);
  }
};
