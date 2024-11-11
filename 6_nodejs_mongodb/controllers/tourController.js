const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");

exports.getAllTours = async (req, res) => {
  try {
    // class'tan örnek al (geriye sorguyu oluşturup döndürüyo)
    const features = new APIFeatures(
      Tour.find(),
      req.query,
      req.formattedQuery
    )
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "getAllTours başarısız", error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    // veirtbanına yeni turu kaydet
    const newTour = await Tour.create(req.body);

    // client'a cevap gönder
    res.json({ text: "createTour başarılı", tour: newTour });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ text: "createTour başarısız", error: error.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.json({ text: "getTour başarılı", tour });
  } catch (error) {
    res
      .status(400)
      .json({ text: "getTour başarısız", error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.deleteOne({ _id: req.params.id });

    res.status(204).json({});
  } catch (error) {
    res.status(400).json({ text: "deleteTour başarısız" });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ text: "updateTour başarılı", tour });
  } catch (error) {
    res.status(400).json({ text: "updateTour başarısız" });
  }
};

// istek parametrelerini frontendin oluşrutması yerine bu mw ile biz tanımlıyıcaz
exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query["price[lte]"] = "1200";
  req.query.limit = 5;
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";

  next();
};

// rapor oluşturup göndericek
// zorluğa göre gruplandırırak istatistik hesapla
exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Rapor Oluşturulamadı" });
  }
};

// rapor oluşturup göndericek:
// belirli bir yıl için o yılın her ayında kaç tane ve hangi turlar başlayacak
exports.getMonthlyPlan = async (req, res) => {
  try {
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
      return res.status(404).json({
        message: `${year} yılında herhagi bir tur başlamıyor`,
      });
    }

    res.status(200).json({
      message: `${year} yılı için aylık plan oluşturuldu`,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: `Aylık plan oluşturulamadı`,
      error: error.message,
    });
  }
};
