const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const formatQuery = require("../middleware/formatQuery");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// ---- routes -----
router.route("/top-tours").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(protect, restrictTo("admin"), getTourStats);

router.route("/monthly-plan/:year").get(protect, restrictTo("admin"), getMonthlyPlan);

router.route("/").get(formatQuery, getAllTours).post(protect, restrictTo("lead-guide", "admin"), createTour);

router
  .route("/:id")
  .get(getTour)
  .delete(protect, restrictTo("lead-guide", "admin"), deleteTour)
  .patch(protect, restrictTo("guide", "lead-guide", "admin"), updateTour);

// Nested Routes
// POST /api/tours/123456/reviews > tura yeni bir torum ekle
// GET /api/tours/123456/reviews > tura ait olan bütün yorumları al
// GET /api/tours/123456/reviews/5679856754 > tura ait olan yorumların arasından belirli id'deki yorumu al
router
  .route("/:tourId/reviews")
  .get(reviewController.getAllReviews)
  .post(protect, reviewController.setRefIds, reviewController.createReview);

module.exports = router;
