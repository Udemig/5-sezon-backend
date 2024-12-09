const express = require("express");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/authController");
const {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserPhoto,
  resize,
} = require("../controllers/userController");

const router = express.Router();

// ---- routes -----
router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

router.patch("/update-password", protect, updatePassword);

//
router.use(protect);

router.patch(
  "/update-me",
  uploadUserPhoto, // RAM'de saklar
  resize, // Yeniden boyutlandırıp diske kaydeder
  updateMe // Veritbanındaki kullanıcı photo bilgisini günceller
);

router.delete("/delete-me", deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
