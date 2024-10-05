const fs = require("fs");
const crypto = require("crypto");
const write = require("../utils/write");

// araba verilerini al
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

// Bütün araçları al:
exports.getAllCars = (req, res) => {
  res.status(200).json({
    message: "Araç verileri alındı",
    results: cars.length,
    cars,
  });
};

// Yeni araç ekle:
exports.createCar = (req, res) => {
  // araç verisine id ekle
  const newCar = { ...req.body, id: crypto.randomUUID() };

  // yeni aracı diziye ekle
  cars.push(newCar);

  // json dosyasını güncelle
  write(cars);

  // client'a cevap gönder
  res.status(201).json({
    message: "Yeni araç oluşturuldu",
    car: newCar,
  });
};

// Bir aracı al:
exports.getCar = (req, res) => {
  res.status(200).json({
    message: "Araç bulundu",
    car: req.car,
  });
};

// Bir aracı sil:
exports.deleteCar = (req, res) => {
  // id'si gelen aracı diziden kaldır
  cars = cars.filter((car) => car.id !== req.params.id);

  // json dosyasını güncelle
  write(cars);

  // client'a cevap gönder
  res.status(204).json({
    message: "Araç silindi",
  });
};

// Bir aracı güncelle:
exports.updateCar = (req, res) => {
  // isteğin body kısmındaki güncellenicek değerleri al
  const updatedData = req.body;

  // aracın güncel değerlerine sahip yeni bir nesne oluştur
  const updatedCar = { ...req.car, ...updatedData };

  // güncellenicek elemanın sırasını bul
  const index = cars.findIndex((car) => car.id === updatedCar.id);

  // dizideki eski aracın yerine yeni aracı koy
  cars.splice(index, 1, updatedCar);

  // json dosyasını güncelle
  write(cars);

  // client'a cevap gönder
  res.status(200).json({
    message: "Araç güncellendi",
    car: updatedCar,
  });
};
