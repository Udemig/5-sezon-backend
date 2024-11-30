const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const cookieParser = require("cookie-parser");
const error = require("./utils/error.js");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// express uygulamsı oluştur
const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Kısa süre içerisinde çok fazla istekte bulundunuz. Lütfen daha sonra tekrar deneyin",
});

//! middleware

// client'a gönderilen cevaba güvenlik amaçlı http headerları ekler
app.use(helmet());

// rate limit: aynı ip adresinden belirli bir süre içerisinde gelebilecek istek sınırını belirle
app.use("/api", limiter);

// client'tan gelen json versini js'e çevir (maks kota)
app.use(express.json({ limit: "10kb" }));

// (body/params/headers/query) alanlarında mongodb kodu tespit ettiği zaman boza
app.use(sanitize());

// hpp: parametre kirliliğini önler
app.use(hpp());

// client'tan gelen çerezleri işler
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
