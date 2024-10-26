const Tour = require("../models/tourModel.js");

exports.getAllTours = async (req, res) => {
  try {
    // veritabanındaki users kolleksiyonundaki veirleri al
    const tours = await Tour.find();

    // client'a veritbanından gelen verileri gönder
    res.json({ message: "getAllTours başarılı", tours });
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
