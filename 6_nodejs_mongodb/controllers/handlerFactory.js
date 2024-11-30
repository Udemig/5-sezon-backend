const APIFeatures = require("../utils/apiFeatures");
const c = require("../utils/catchAsync");

// Bir belgeyi silme işlemi proje içerisinde sadecee moel ismi değiştirilerek defalarca kullanılıp gereksiz kod tekrarına sebep oluyordu bundan dolayı kod tekrarını önlemek için bir fonksiyon yazdık.
// Dışarıdan parametre olarak aldığı model'e göre gerekli işlemi yapar

// Silme
exports.deleteOne = (Model) =>
  c(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({});
  });

// Güncelleme
exports.updateOne = (Model) =>
  c(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Belge başarıyla güncelleni", data: document });
  });

// Oluşturma
exports.createOne = (Model) =>
  c(async (req, res, next) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
      message: "Belge başarıyla oluşturuldu",
      data: newDocument,
    });
  });

// Bir tane döküman al
exports.getOne = (Model, populateOptions) =>
  c(async (req, res, next) => {
    // sorguyu oluştur
    let query = Model.findById(req.params.id);

    // eğer populate parametresi geldiyse sorguya ekle
    if (populateOptions) query = query.populate(populateOptions);

    // sorguyu çalıştır
    const document = await query;

    res.status(200).json({ message: "Belge başarıyla alındı", data: document });
  });

// Bütün dökümnaları al (filtreleme - sıralama)
exports.getAll = (Model) =>
  c(async (req, res, next) => {
    //* /api/reviews > bütün yorumları getir
    //* /api/tours/123/reviews > 123 id'li turun bütün yorumlarını getir
    let filters = {};

    if (req.params.tourId) filters = { tour: req.params.tourId };

    // class'tan örnek al (geriye sorguyu oluşturup döndürüyo)
    const features = new APIFeatures(Model.find(filters), req.query, req.formattedQuery).filter().limit().sort().pagination();

    // sorguyu çalıştır
    const documents = await features.query;

    // client'a veritbanından gelen verileri gönder
    res.json({
      message: "Belgeler başarıyla alındı",
      results: documents.length,
      data: documents,
    });
  });
