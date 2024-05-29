const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Protected route example
router.get('/profile', authMiddleware, authController.getProfile);

router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
