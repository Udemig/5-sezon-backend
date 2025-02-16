// tokeni doğrulyacak middleware
const authMiddleware = {
  authenticate: async (req, res, next) => {},

  authorize: async (roles = []) => {},

  refreshTokenMiddleware: async (req, res, next) => {},
};

module.exports = authMiddleware;
