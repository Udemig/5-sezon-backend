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

  return res
    .status(200)
    .json({ message: "Rapor Oluşturuldu", stats });
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

// belirli koordinatlardaki turları filtrele
exports.getToursWithin = c(async (req, res, next) => {
  // parametrelere eriş
  const { distance, latlng, unit } = req.params;

  // enlem ve boylamı değişkene aktar
  const [lat, lng] = latlng.split(",");

  // merkez noktası gönderilmediyse hata fırlat
  if (!lat || !lng)
    return next(e(400, "Lütfen merkez noktasını belirleyin"));

  const radius =
    unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  // belirlenen dairesel alandaki turları filtrele
  const tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[lat, lng], radius],
      },
    },
  });

  // clienta cevap gönder
  res.status(200).json({
    message: "Sınırlar içerisindeki turlar alındı",
    tours,
  });
});

// turların kullanıcıdan uzaklıklarını hesapla
exports.getDistances = c(async (req, res, next) => {
  // urldeki parametrelere eriş
  const { latlng, unit } = req.params;

  // enlem boylamı ayır
  const [lat, lng] = latlng.split(",");

  // enlem veya boylam yoksa hata fırlat
  if (!lat || !lng)
    return next(e(400, "Lütfen merkez noktayı tanımlayın"));

  // unit'e göre radyanı doğru formata çevirmek için kaçla çarpılmalı
  const multiplier = unit === "mi" ? 0.000621371192 : 0.001;

  // turların merkez noktadan uzaklıklarını hesapla
  const distances = await Tour.aggregate([
    // 1) uzaklığı hesapla
    {
      $geoNear: {
        near: { type: "Point", coordinates: [+lat, +lng] },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    //2) nesneden istediğimiz değerleri seç
    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);

  res
    .status(200)
    .json({ message: "Uzaklıklar hesaplandı", distances });
});
