const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Kullanıcı Şeması
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır"],
    minLength: [3, "Kullanıcı ismi en az 3 karakter olmalı"],
    maxLength: [30, "Kullanıcı ismi en fazla 30 karakter olabilir"],
  },

  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalıdır"],
    unique: [true, "Bu eposta adresine kayıt kullanıcı zaten var"],
    validate: [validator.isEmail, "Lütfen geçerli bir mail giriniz"],
  },

  photo: {
    type: String,
    default: "defaultpic.webp",
  },

  password: {
    type: String,
    required: [true, "Kullanıcı şifreye sahip olmalıdır"],
    minLength: [8, "Şifre en az 8 karakter olmalı"],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayın"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
  },
});

//? Veritbanına kullanıcıyı kaydetmeden önce:
//* passwordConfirm alanını kaldır
//* password alanını şifreleme algoritmaları ile şifrele
userSchema.pre("save", async function (next) {
  // save kullanıcı belgesi her güncellendiğinde çalışır ama parola değişmediyse aşağıdaki kodlar çalışmamalı
  if (!this.isModified("password")) return next();

  // şifreyi saltla ve hashle
  this.password = await bcrypt.hash(this.password, 12);

  // onay şifresini kaldır
  this.passwordConfirm = undefined;

  next();
});

//? Sadece model üzerinden erişilebilen fonksiyon
// normal şifre ile hesahlenmiş şifreyi karşılaştırsın
userSchema.methods.correctPass = async function (pass, hashedPass) {
  // pass > Denem@123
  // hashedPass > $2b$12$N9BQoexMwICIptP7t5nMJOGqNGJB03qad38G19qe5tTZjOi0th.fi
  return await bcrypt.compare(pass, hashedPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;