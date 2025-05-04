import express from "express";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";
import i18n from "i18n";
import path from "path";

// express kurulumu
const app = express();
const port = 4004;

//i18n yapılandırması
i18n.configure({
  locales: ["tr", "en", "de"],
  directory: "./locales",
  defaultLocale: "tr",
  queryParameter: "lang", // ?lang=tr,
  autoReload: true,
  updateFiles: false,
});

// i18n middleware'ini kullan
app.use(i18n.init);

// cors hatalarını önleyen mw (oto header ekler)
app.use(cors());

// bodydeki json verilerini çeviren
app.use(express.json());

// tarifler için crud opersyonlarını gerçekeleştireceğimiz endpointleri tanımla
app.use(recipeRouter);

// dinlenicek portu belirle
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışmaya başladı`);
});
