const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/** Runs after validation chains; turns failures into a 400 ApiError. */
const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
  next(new ApiError(400, 'Validation failed', errors));
};

const registerRules = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidation,
];

const loginRules = [
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

module.exports = { registerRules, loginRules };
