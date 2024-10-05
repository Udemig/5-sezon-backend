const express = require("express");
const { logger } = require("./middleware");
const carRoutes = require("./routes/carRoutes");

// kurulum
const app = express();
const PORT = 3000;

// Middleware (Arayazılım)
app.use(logger);

// istklerin body/header/param böülmlerini işleyen mw
app.use(express.json());

// route/endpoint 'leri tanımla
app.use(carRoutes());

// dinlenicek portu belirle
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
