const express = require('express');
const router = express.Router();
const { register, login, getPendingUsers, approveUser } = require('../controllers/AuthContoller');
const admin = require('../middleware/adminMiddleware');
const auth = require('../middleware/AuthMiddleware');

router.post('/register', register);
router.post('/login', login);
// Admin routes
router.get('/pending', auth, admin, getPendingUsers);
router.put('/approve/:id', auth, admin, approveUser);
module.exports = router;