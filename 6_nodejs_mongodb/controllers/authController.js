const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ---------- jwt tokeni oluşturup döndürür ---------------
const signToken = (user_id) => {
  return jwt.sign(
    { id: user_id },
    process.env.JWT_SECRET, //
    { expiresIn: process.env.JWT_EXP }
  );
};

// ---------- jwt tokeni oluşturup client'a gönderir ---------------
const createSendToken = (user, code, res) => {
  // tokeni oluştur
  const token = signToken(user._id);

  // çerez olarak gönderilecek veriyi belirle
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true, // true olunca sadece https protokolündeki domainlerde seyahat eder
  });

  // şifreyi client'a gönderilen cevaptan kaldır
  user.password = undefined;

  // client'a cevap gönder
  res.status(code).json({ message: "Oturum açıldı", token, user });
};

// ---------- Kaydol ---------------
exports.signUp = async (req, res) => {
  try {
    // yeni bir kullanıcı oluştur
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // jwt tokeni oluşturup gönder
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({
      message: "Üzgünüz bir sorun oluştu",
      error: error.message,
    });
  }
};

// ---------- Giriş Yap ---------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) email ve şifre geldi mi kontrol et
    if (!email || !password) {
      return res.status(400).json({ message: "Lüfen mail ve şifre giriniz" });
    }

    // 2) client'den gelen email'de kayıtlı kullanıcı var mı kontrol et
    const user = await User.findOne({ email });

    // 2.1) kayıtlı kullanıcı yoksa hata fırlat
    if (!user) {
      return res.status(404).json({ message: "Girdiğiniz maile kayıtlı kullanıcı yok" });
    }

    // 3) client'dan gelen şifre ile veritbanında saklanan hashlenmiş ile eşleşiyor mu kontrol et
    const isValid = await user.correctPass(password, user.password);

    // 3.1) şifre yanlışsa hata fırlat
    if (!isValid) {
      return res.status(401).json({ message: "Girdiğiniz şifre geçersiz" });
    }

    // 4) jwt tokenini oluşturup gönder
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      message: "Üzgünüz bir sorun oluştu",
    });
  }
};

// ---------- Çıkış Yap ---------------
exports.logout = (req, res) => {};
