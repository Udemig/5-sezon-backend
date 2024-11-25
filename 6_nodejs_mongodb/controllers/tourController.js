const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");
const e = require("../utils/error.js");
const c = require("../utils/catchAsync.js");

exports.getAllTours = c(async (req, res, next) => {
  // class'tan örnek al (geriye sorguyu oluşturup döndürüyo)
  const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
    .filter()
    .limit()
    .sort()
    .pagination();

  // sorguyu çalıştır
  const tours = await features.query;

  // client'a veritbanından gelen verileri gönder
  res.json({
    message: "getAllTours başarılı",
    results: tours.length,
    tours,
  });
});

exports.createTour = c(async (req, res, next) => {
  // veirtbanına yeni turu kaydet
  const newTour = await Tour.create(req.body);

  // client'a cevap gönder
  res.json({ text: "createTour başarılı", tour: newTour });
});

exports.getTour = c(async (req, res, next) => {
  // id şeklinde olan user referanlsarını populate ile user verileriyle doldurduk
  const tour = await Tour.findById(req.params.id);

  // todo idli eleman bulunamazsa hata gönder

  res.json({ text: "getTour başarılı", tour });
});

exports.deleteTour = c(async (req, res, next) => {
  await Tour.deleteOne({ _id: req.params.id });

  res.status(204).json({});
});

exports.updateTour = c(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({ text: "updateTour başarılı", tour });
});

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
