import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import reviewRouter from "./routes/review.routes.ts";
import gigRouter from "./routes/gig.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// env dosyasındaki değişkenlere erişmemizi sağlar
dotenv.config();

// veritbanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("⚾️ Veritabanı ile bağlantı kuruldu"))
  .catch((err) => console.log("🏀 Veritabanına bağlanamadı", err));

// express uygulamaısnı başlat
const app = express();

// middleware'ler
app.use(express.json());

// route'lar
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// hata yönetimi için mw
app.use(errorMiddleware);

// dinlemeye başla
app.listen(process.env.PORT, () => {
  console.log(`🎾 Server ${process.env.PORT}. portu dinlemeye başladı`);
});
