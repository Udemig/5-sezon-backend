const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "Yorum içeriği boş olamaz"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Puan değeri tanımlanmalı"],
    },

    tour: {
      type: Schema.ObjectId,
      ref: "Tour",
      required: [true, "Yorumun hangi tur için atıldığını belirtin"],
    },

    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Yorumu hangi kullanıcının attığını belirtin"],
    },
  },
  {
    timestamps: true,
  }
);

// yapılan sorgulardan önce kullanıcıların referansını gerçek veri kayıtlarıyla doldur
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });

  next();
});

// bir tur için turun rating ortalamasını hesaplayan bir fonksiyon yazalım
reviewSchema.statics.calcAverage = async function (tourId) {
  // aggreage ile istatistik hesapla
  const stats = await this.aggregate([
    [
      // 1) parametre olarak gelen turun id'si ile eşleşen yorumları al
      { $match: { tour: tourId } },
      // 2) toplam yorum sayısı ve yorumların ortalama değerini hesapla
      {
        $group: {
          _id: "$tour",
          nRating: { $sum: 1 }, // toplam yorum sayısı
          avgRating: { $avg: "$rating" }, // rating ortalaması
        },
      },
    ],
  ]);

  console.log(stats);
};

// todo her yeni yorum atıldığında / silindiğinde / güncellendiğinde yukarıdaki methodu çalıştırıp güncel rating değerlini alıp tour belgesini güncelle

const Review = model("Review", reviewSchema);

module.exports = Review;
