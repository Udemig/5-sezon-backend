const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
} = require("../controllers/tourController");

const router = express.Router();

// ---- routes -----
router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
