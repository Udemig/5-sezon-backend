const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");
const e = require("../utils/error.js");
const c = require("../utils/catchAsync.js");
const factory = require("./handlerFactory.js");

exports.getAllTours = factory.getAll(Tour);

exports.createTour = factory.createOne(Tour);

exports.getTour = factory.getOne(Tour, "reviews");

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

// istek parametrelerini frontendin oluşrutması yerine bu mw ile biz tanımlıyıcaz
exports.aliasTopTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query["price[lte]"] = "1200";
  req.query.limit = 5;
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";

  next();
};

// rapor oluşturup göndericek
// zorluğa göre gruplandırırak istatistik hesapla
exports.getTourStats = c(async (req, res, next) => {
  // Aggeregation Pipeline
  // Raporlama Adımları
  const stats = await Tour.aggregate([
    // 1.Adım) ratingi 4 ve üzeri olan turları al
    { $match: { ratingsAverage: { $gte: 4 } } },
    // 2.Adım) zorluğa göre gruplandır ve ortalama değerlerini hesapla
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    // 3.Adım) gruplanan veriyi fiyata göre sırala
    { $sort: { avgPrice: 1 } },
    // 4.Adım) fiyatı 500den büyük olanları al
    { $match: { avgPrice: { $gte: 500 } } },
  ]);

  return res.status(200).json({ message: "Rapor Oluşturuldu", stats });
});

// rapor oluşturup göndericek:
// belirli bir yıl için o yılın her ayında kaç tane ve hangi turlar başlayacak
exports.getMonthlyPlan = c(async (req, res, next) => {
  // parametre olarak gelen yılı al
  const year = Number(req.params.year);

  // raporu oluştur
  const stats = await Tour.aggregate([
    {
      $unwind: {
        path: "$startDates",
      },
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: "$startDates",
        },
        count: {
          $sum: 1,
        },
        tours: {
          $push: "$name",
        },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  if (stats.length === 0) {
    return next(e(404, `${year} yılında herhagi bir tur başlamıyor`));
  }

  res.status(200).json({
    message: `${year} yılı için aylık plan oluşturuldu`,
    stats,
  });
});
