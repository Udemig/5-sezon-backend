const AuthService = require("./auth.service");

// tokeni doğrulyacak middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Bu route'a erişme yetkiniz yok" });
    }

    const accessToken = authHeader.split(" ")[1];

    const user = await AuthService.validateToken(accessToken);

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      return res.status(401).json({ message: "Bu route'a erişme yetkiniz yok" });
    }
    next(error);
  }
};

module.exports = authenticate;
