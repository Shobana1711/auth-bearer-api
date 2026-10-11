const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { userView, successView } = require('../views/userView');

/** GET /api/users/me - returns the user info decoded from the token (protected) */
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(successView('User information retrieved', userView(req.user)));
});

/** GET /api/users - list all users (admin only, demonstrates authorization) */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(successView('Users retrieved', users.map(userView)));
});
