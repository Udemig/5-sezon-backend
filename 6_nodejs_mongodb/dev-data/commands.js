const mongoose = require("mongoose");
const Tour = require("../models/tourModel.js");
const fs = require("fs");

// Geliştirme aşamasında mongodbdeki verilerin sıkça değişceğinden veya bozulacğaından veritabanındaki verileri temizlmeye ve json dosyasındaki verileri veritabanına aktarmaya yarayan ve terminalden komutlarla çalışacak 2 fonksiyon yazalım

// .env dosyasında değşikenlere erişim sağlar
require("dotenv").config();

//  mongodb veritabanına bağlan (local) (atlas)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("🎾 Veritabanına bağlandı");
  })
  .catch((err) => {
    console.log("💥 Veritbanına bağlanamadı!!");
  });

// json dosyasında verileri al
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

// devdata klasöründeki json dosylarını veritbanına aktarır
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("veriler veritabanına aktarıldı");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// mongodbdeki verileri
const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log("bütün veriler temizlendi");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// çalıştırılan komutun sonuna eklenen bayrağa göre doğru fonksiyonu tetikle
if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--clear")) {
  clearData();
}