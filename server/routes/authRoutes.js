const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Get all users (Admin and Manager only)
router.get('/', authMiddleware, roleMiddleware(['admin', 'manager']), userController.getAllUsers);

// Get user by ID (Admin, Manager and the User themselves)
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'employee']), userController.getUserById);

// Update user by ID (Admin and the User themselves)
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'employee']), userController.updateUserById);

// Delete user by ID (Admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), userController.deleteUserById);

module.exports = router;
