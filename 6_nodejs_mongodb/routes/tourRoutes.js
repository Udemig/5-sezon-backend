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

const router = express.Router();

// ---- routes -----
router.route("/top-tours").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(protect, restrictTo("admin"), getTourStats);

router.route("/monthly-plan/:year").get(protect, restrictTo("admin"), getMonthlyPlan);

router
  .route("/")
  .get(formatQuery, getAllTours)
  .post(protect, restrictTo("lead-guide", "admin"), createTour);

router
  .route("/:id")
  .get(getTour)
  .delete(protect, restrictTo("lead-guide", "admin"), deleteTour)
  .patch(protect, restrictTo("guide", "lead-guide", "admin"), updateTour);

module.exports = router;
