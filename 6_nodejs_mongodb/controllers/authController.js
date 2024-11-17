const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const e = require("../utils/error");
const c = require("../utils/catchAsync");

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
exports.signUp = c(async (req, res, next) => {
  // yeni bir kullanıcı oluştur
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // jwt tokeni oluşturup gönder
  createSendToken(newUser, 201, res);
});

// ---------- Giriş Yap ---------------
exports.login = c(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) email ve şifre geldi mi kontrol et
  if (!email || !password) {
    return next(e(400, "Lüfen mail ve şifre giriniz"));
  }

  // 2) client'den gelen email'de kayıtlı kullanıcı var mı kontrol et
  const user = await User.findOne({ email });

  // 2.1) kayıtlı kullanıcı yoksa hata fırlat
  if (!user) {
    return next(e(404, "Girdiğiniz maile kayıtlı kullanıcı yok"));
  }

  // 3) client'dan gelen şifre ile veritbanında saklanan hashlenmiş ile eşleşiyor mu kontrol et
  const isValid = await user.correctPass(password, user.password);

  // 3.1) şifre yanlışsa hata fırlat
  if (!isValid) {
    return next(e(403, "Girdiğiniz şifre geçersiz"));
  }

  // 4) jwt tokenini oluşturup gönder
  createSendToken(user, 200, res);
});

// ---------- Çıkış Yap ---------------
exports.logout = (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Oturumunuz Kapatıldı" });
};

// ---------- Authorization MW ---------------
// * 1) Client'ın gönderdiği tokenin geçerliliğini doğrulayıp:
// - Geçerliyse route'a erişime izin vermeli
// - Geçerli değilse hata fırlat

exports.protect = async (req, res, next) => {
  // 1) client'tan gelen tokeni al
  let token = req.cookies.jwt || req.headers.authorization;

  // 1.2) token header olarak geldiyse bearer kelimesinden sonrasını al
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }

  // 1.3) token gelmediyse hata fırlat
  if (!token) {
    return next(e(403, "Bu işlem için yetkiniz yok (jwt gönderilmedi)"));
  }

  // 2) tokenin geçerliliğini doğrula (zaman aşımına uğradımı / imza doğru mu)
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.message === "jwt expired") {
      return next(e(403, "Oturumunuz süresi doldu (tekrar giriş yapın)"));
    }

    return next(e(403, "Gönderilen token geçersiz"));
  }

  // 3) token ile gelen kullanıcının hesabı duruyor mu
  let activeUser;

  try {
    activeUser = await User.findById(decoded.id);
  } catch (error) {
    return next(e(403, "Gönderilen token geçersiz"));
  }

  // 3.1) hesap silindiyse hata gönder
  if (!activeUser) {
    return next(e(403, "Kullanıcının hesabına erişilemiyor (tekrar kaydolun)"));
  }

  // 3.2) hesap dondurulduysa hata gönder
  if (!activeUser?.active) {
    return next(e(403, "Kullanıcının hesabı dondurulmuş"));
  }

  // 4) tokeni verdikten sonra şifresini değiştirmiş mi kontrol et
  if (activeUser?.passChangedAt && decoded.iat) {
    const passChangedSeconds = parseInt(activeUser.passChangedAt.getTime() / 1000);

    if (passChangedSeconds > decoded.iat) {
      return next(
        e(403, "Yakın zamanda şifrenizi değiştirdiriniz. Lütfen tekrar giriş yapın")
      );
    }
  }

  // bu mw'den sonra çalışıcak olan bütün mw ve methodlara aktif kullanıcı verisini gönder
  req.user = activeUser;

  next();
};

// * 2) Belirli roldeki kullanıcıların route'a erişimine izin verirken diğerlerini engelleyen mw
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // a) izin verilen rollerin arasında mvcut kullanıcının rolü yoksa hata gönder
    if (!roles.includes(req.user.role)) {
      return next(e(403, "Bu işlem için yetkiniz yok (rolünüz yetersiz)"));
    }

    // b) kullanıcının rolü yeterliyse sonraki adıma devam et
    next();
  };

// ---------- Şifre Sıfırlama ---------------

// ---- Şifremi Unuttum ----

// a) Eposta adresine şifre sıfırlama bağlantısını gönder
exports.forgotPassword = c(async (req, res, next) => {
  //1) epostaya göre kullanıcı hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  //1) kullanıcı yoksa hata gönder
  if (!user) return next(e(404, "Bu mail adresine kayıtlı kullanıcı yok"));

  //2) şifre sıfırlama tokeni oluştur
  const resetToken = user.createResetToken();

  //3) güncellemeleri veritbanına kaydet
  await user.save({ validateBeforeSave: false });

  //4) kullanıcının mail adresine tokeni link olarak gönder
  const url = `${req.protocol}://${req.headers.host}/api/users/reset-password/${resetToken}`;

  await sendMail({
    email: user.email,
    subject: "Şifre sıfırlama bağlantısı (10 dakika)",
    text: resetToken,
    html: `
    <h2>Merhaba ${user.name}</h2>
    <p><b>${user.email}</b> eposta adresine bağlı tourify hesabınız için şifre sıfırlama bağlantısı aşağıdadır </p>
    <a href="${url}">${url}</a>
    <p>Yeni şifre ile birlikte yukarıdaki bağlantıysa <i>PATCH</i> isteği attınız</p>
    <p><b><i>Tourify Ekibi</i></b></p>
    `,
  });

  //5) client'a cevap gönder
  res.status(201).json({ message: "eposta gönderildi" });
});

// b) Yeni belirlenen şifreyi kaydet
exports.resetPassword = c(async (req, res, next) => {
  //1) tokendan yola çıkarak kullanıcıyı bul
  const token = req.params.token;

  //2) elimizdeki normal token olduğu ve veritbanında hashlenmiş hali saklandığı için bunları karşılaştırabilmek adına elimizdeki tokeni hashleyip veritbanında aratıcaz
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //3) hashlenmiş token'la ilişkili kullanıcyı al
  //3.1) son geçerlilik tarihi henüz dolmamış olduğunu kontrol et
  const user = await User.findOne({
    passResetToken: hashedToken,
    passResetExpires: { $gt: Date.now() },
  });

  //4) token geçersiz veya süresi dolmuşsa hata gönder
  if (!user) {
    return next(e(403, "Tokenin süresi dolmuş veya geçersiz"));
  }

  //5) kullanıcının bilgilerini güncelle
  user.password = req.body.newPass;
  user.passwordConfirm = req.body.newPass;
  user.passResetToken = undefined;
  user.passResetExpires = undefined;

  await user.save();

  // 6) client'a cevap gönder
  res.status(200).json({ message: "Şifreniz başarıyla güncellendi" });
});

// ---- Şifre Güncelle ----
// Kullanıcı şifresini hatırlıyor ve güncellemek istiyorsa
exports.updatePassword = c(async (req, res, next) => {
  //1) kullanıcının bilgilerini al
  const user = await User.findById(req.user.id);

  //2) gelen mevcut şifre doğru mu kontrol et
  if (!(await user.correctPass(req.body.currentPass, user.password))) {
    return next(e(400, "Girdiğiniz mevcut şifre hatalı"));
  }

  //3) doğruysa yeni şifreti kaydet
  user.password = req.body.newPass;
  user.passwordConfirm = req.body.newPass;

  await user.save();

  //4) (opsiyonel) bilgilendirme maili gönder
  await sendMail({
    email: user.email,
    subject: "Tourify Hesabı Şifreniz Güncellendi",
    text: "Bilgilendirme Maili",
    html: `
  <h1>Hesap Bilgileriniz Güncellendi</h1>
  <p>Merhaba, ${user.name}</p>
  <p>Hesap şifrenizin başarıyla güncellendiğini bildirmek isteriz. Eğer bu değişikliği siz yapmadıysanız veya bir sorun olduğunu düşünüyorsanız, lütfen hemen bizimle iletişime geçin.</p>
  <p>Hesabınızın güvenliğini sağlamak için şu adımları izleyebilirsiniz:</p>
  <ul>
    <li>Şifrenizi değiştirin.</li>
    <li>Hesabınızda tanımlı giriş noktalarını kontrol edin.</li>
    <li>İki faktörlü kimlik doğrulamayı aktif hale getirin.</li>
  </ul>
  <p>Teşekkürler,</p>
  <p><i><b>Tourify Ekibi</b></i></p>
    `,
  });

  //5) (opsiyonel) tekrar giriş yapmaması için token oluştur
  createSendToken(user, 200, res);
});
