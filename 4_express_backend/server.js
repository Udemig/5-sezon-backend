const express = require("express");
const {
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  createCar,
} = require("./controllers");
const { logger } = require("./middleware");
const idControl = require("./middleware/idControl");

// kurulum
const app = express();
const PORT = 3000;

// Middleware (Arayazılım)
app.use(logger);

// istklerin body/header/param böülmlerini işleyen mw
app.use(express.json());

// route/endpoint 'leri tanımla
app
  .route("/api/v1/cars")
  .get(getAllCars) //
  .post(createCar);

app
  .route("/api/v1/cars/:id")
  .get(idControl, getCar)
  .patch(idControl, updateCar)
  .delete(idControl, deleteCar);

// dinlenicek portu belirle
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
