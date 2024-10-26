const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");

// express uygulamsı oluştur
const app = express();

// middleware
app.use(express.json());

// router'ları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// server.js'de kullanmak için export ettik
module.exports = app;
