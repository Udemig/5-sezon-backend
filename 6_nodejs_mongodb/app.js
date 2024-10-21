const express = require("express");

// express uygulamsı oluştur
const app = express();

// yeni endpoint oluştur
app.get("/api/tours", (req, res) => {
  res.status(200).json({ message: "Veriler..." });
});

// server.js'de kullanmak için export ettik
module.exports = app;
