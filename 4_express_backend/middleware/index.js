exports.logger = (req, res, next) => {
  console.log(
    "💥 İSTEK GELDİ 💥",
    "Method:",
    req.method + " URL:" + req.url
  );

  // arayazılımdan sonra çalışıcak olan fonksiyon çalışsın:
  next();
};
