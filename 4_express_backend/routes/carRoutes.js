const express = require("express");
const {
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  createCar,
} = require("../controllers");
const idControl = require("../middleware/idControl");

// Router > server.js dosyası dışarıısında route tanımı yapmamızı sağlar s
const router = express.Router();

// router'a enpointler ve istek geldiğinde çalışıcak fonksiyonları belirliyoruz
router
  .route("/api/v1/cars")
  .get(getAllCars) //
  .post(createCar);

router
  .route("/api/v1/cars/:id")
  .get(idControl, getCar)
  .patch(idControl, updateCar)
  .delete(idControl, deleteCar);

// server.js'e router'ı tanıtmak için export et
module.exports = router;
