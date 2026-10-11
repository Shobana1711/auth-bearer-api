const router = require('express').Router();
const { getMe, getAllUsers } = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/me', verifyToken, getMe);
router.get('/', verifyToken, authorizeRoles('admin'), getAllUsers);

module.exports = router;
