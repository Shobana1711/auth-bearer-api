const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { userView, successView } = require('../views/userView');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

/** POST /api/auth/register */
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) throw new ApiError(409, 'Username or email already in use');

  // Password is hashed by the model's pre-save hook.
  // Role is intentionally NOT taken from the request, so nobody can self-assign admin.
  const user = await User.create({ username, email, password });

  res.status(201).json(successView('User registered successfully', userView(user)));
});

/** POST /api/auth/login */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  // Same message for both cases so attackers can't tell which part was wrong
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    tokenType: 'Bearer',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
});
