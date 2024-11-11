const express = require("express");
const { signUp, login, logout } = require("../controllers/authController");

const router = express.Router();

// ---- routes -----
router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
