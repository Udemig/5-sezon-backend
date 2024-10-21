const app = require("./app.js");
const mongoose = require("mongoose");

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

// express uygulmasını ayağa kaldır (dinlemeyi başlat)
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚾️ ${port}. port dinlenmeye başlandı`);
});
