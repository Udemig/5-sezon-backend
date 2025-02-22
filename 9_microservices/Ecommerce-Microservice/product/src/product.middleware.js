const jwt = require("jsonwebtoken");

// tokeni doğrulyacak middleware
exports.authenticate = async (req, res, next) => {
  // header olarak access token geldi mi kontrol et
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Bu route'a erişme yetkiniz yok" });
  }

  // tokenı al
  const accessToken = authHeader.split(" ")[1];

  // tokenı doğrula
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(err);
    return res.status(401).json({ message: "Bu route'a erişme yetkiniz yok" });
  }
};

// sadece adminlere izin veren mw
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Erişim reddedildi. Sadece admin." });
  }
};
