/*
 * Mongoose'da neden modele ihitiyaç duyarız ?
 * Bir kolleksiyona yeni bir veri eklerken bunun bir kısıtlmaya tabi tutulmasını isteriz önreğin users kolleksiyonundaki her bir nesnenin name,surname ve age değerlnin olmaını iseriz. Kyadeidlecek olan her bir veri bu şemadaki kısıtlamlara uygunsa kaydedilir aksi takdirde hata fırlatır.
 * Bu sayede kolleksiyonda tutulan dökümanalrın daha tutarlı olmasını sağlarız
 */

const mongoose = require("mongoose");

// veritabanına kaydedilecek olan verilerin kısıtlamalarını yazarız
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Bu tur ismi zaten mevcut"],
      required: [true, "Tur isim değerine sahip olmalı"],
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
    },

    duration: {
      type: Number,
      required: [true, "Tur süre değerine sahip olmalı"],
    },

    difficulty: {
      type: String,
      required: [true, "Tur zorluk değerine sahip olmalı"],
      enum: ["easy", "medium", "hard", "difficult"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Tur maksimum kişi sayısı değerine sahip olmalı"],
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating değeri 1'den küçük olamaz"],
      max: [5, "Rating değeri 5'den büyük olamaz"],
      default: 4.0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      maxLength: [200, "Özet alanı 200 karakteri geçemez"],
      required: [true, "Tur özet değerine sahip olmalı"],
    },

    description: {
      type: String,
      maxLength: [1000, "Açıklama alanı 1000 karakteri geçemez"],
      required: [true, "Tur açıklama değerine sahip olmalı"],
    },

    imageCover: {
      type: String,
      required: [true, "Tur kağak fotğrafına sahip olmalı"],
    },

    images: {
      type: [String],
    },

    startDate: {
      type: [Date],
    },
  },
  // şema ayarları
  { timestamps: true }
);

// şemayı kullanrak model oluşturuyoruz
const Tour = mongoose.model("Tour", tourSchema);

// controller'da kullanmak için export
module.exports = Tour;
