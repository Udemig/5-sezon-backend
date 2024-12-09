const multer = require("multer");
const User = require("../models/userModel");
const c = require("../utils/catchAsync");
const error = require("../utils/error");
const filterObject = require("../utils/filterObject");
const factory = require("./handlerFactory");
const sharp = require("sharp");

// diskStorage kurulum (dosyaları disk'e kaydetmeye yarayacak)
// const multerStorage = multer.diskStorage({
//   // dosyanın yükleneceği klasörü belirle
//   destination: function (req, file, cb) {
//     cb(null, "public/img/users");
//   },

//   // dosyanın ismi
//   filename: function (req, file, cb) {
//     // dosyanın uzantısını belirle
//     const ext = file.mimetype.split("/")[1];

//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// memory storage kurulumu (resimleri buffer veri tipinde RAM'de saklar)
const multerStorage = multer.memoryStorage();

// fotoğraf dışında veri tiplerini kabul etmeyen mw
const multerFilter = (req, file, cb) => {
  // eğerki dosya tipi resim ise kabul et
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // resim değilse hata fırlat
    cb(new Error("Dosya tipi sadece resim olabilir (jpg,jpeg,png,webp..)"));
  }
};

// multer kurulum (client'dan gelen dosyalara erişmemizi sağlayacak)
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// kullanıcı 4k çözünürlükte 30-40mb bir fotoğrafı profil fotoğrafı olarak yüklemeye çalışabilir.
// proje içerisinde profil fotoğrafları genelde 40x40 veya 80x80 boyutlarındak kullanılır ama kullanıcı fotoğrafı seçerken 2560x1680 gibi yüksek kalite fotoğraf seçebilir ve herhangi bir işlemden geçriemeden sunucuya kaydedersek gereksiz yer kaplar. Bu yüzden yüklenicek olan fotoğrafın çözünürlüğünü projedeki max boyuta indiricez.
exports.resize = (req, res, next) => {
  // eğer dosya yoksa yeniden boyutlandırma yapma ve sonraki adıma geç
  if (!req.file) return next();

  // işlenmiş dosyanın ismini belirle
  const filename = `user-${req.user.id}-${Date.now()}.webp`;

  // dosyayı işle ve yükle (
  sharp(req.file.buffer) // buffer veritipindeki resmi alır
    .resize(400, 400) // yeniden boyulandırma yapar
    .toFormat("webp") // dosya formatını değiştirir
    .webp({ quality: 70 }) // resmin kalitesini %70'e çeker
    .toFile(`public/img/users/${filename}`); // dosyayı diske kaydeder

  next();
};

// dosyalara erişip diske kaydeden mw
exports.uploadUserPhoto = upload.single("avatar");

// hesap bilgilerini güncelle
exports.updateMe = c(async (req, res, next) => {
  // 1) şifreyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm)
    return next(error(400, "Şifreyi bu endpoint ile güncelleyemezsiniz"));

  // 2) isteğin body kısmından sadece izin verilen değerleri al
  const filtredBody = filterObject(req.body, ["name", "email"]);

  // 2.1) eğer isteği içerisinde avatar değeri varsa güncellenicek olan verilerin arasına url'i ekle
  if (req.file) filtredBody.photo = req.file.filename;

  // 3) kullanıcı bilgilerini güncelle
  const updated = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    new: true,
  });

  // 4) client'a cevap gönder
  res
    .status(200)
    .json({ message: "Bilgileriniz başarıyla güncellendi", updated });
});

exports.deleteMe = c(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({ message: "Hesabınız başarıyla kaldırıldı" });
});

exports.getAllUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
