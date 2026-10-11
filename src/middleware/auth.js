const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

/**
 * Verifies the JWT from the "Authorization: Bearer <token>" header,
 * decodes it and attaches the user's info to req.user.
 */
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization header missing or malformed. Use: Bearer <token>'));
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    // TokenExpiredError / JsonWebTokenError are mapped in the error handler
    next(err);
  }
};

/** Authorization: allow only the given roles. Use after verifyToken. */
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to access this resource'));
  }
  next();
};

module.exports = { verifyToken, authorizeRoles };
