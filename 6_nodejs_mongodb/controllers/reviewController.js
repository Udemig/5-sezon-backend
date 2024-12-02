const c = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");

// mw
exports.setRefIds = (req, res, next) => {
  // eğerki atılan isteğin body kısmında turun id'si varsa onu kullan ama yoksa o zaman isteği paramtre kısmında gelen tur id'sini kullan
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;

  next();
};

exports.getAllReviews = factory.getAll(Review);

exports.createReview = factory.createOne(Review);

exports.getReview = factory.getOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
