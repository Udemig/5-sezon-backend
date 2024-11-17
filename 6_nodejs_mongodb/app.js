const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const cookieParser = require("cookie-parser");
const error = require("./utils/error.js");

// express uygulamsı oluştur
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// router'ları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// tanımlanmayan bir route'a istek atıldığında hata ver
app.all("*", (req, res, next) => {
  const err = error(404, "İstek attığınız yol mevcut değil");

  // yeni yöntem
  next(err);
});

// hata olduğunda devreye giren mw
app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  err.message = err.message || "Üzgünüz bir hata meydana geldi";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// server.js'de kullanmak için export ettik
module.exports = app;
