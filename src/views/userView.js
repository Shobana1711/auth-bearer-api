/**
 * "Views" in an API are the JSON representations sent to the client.
 * Keeping them here guarantees sensitive fields (e.g. password) never leak.
 */
const userView = (user) => ({
  id: user._id || user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  ...(user.createdAt && { createdAt: user.createdAt }),
});

const successView = (message, data) => ({
  success: true,
  message,
  ...(data !== undefined && { data }),
});

module.exports = { userView, successView };
