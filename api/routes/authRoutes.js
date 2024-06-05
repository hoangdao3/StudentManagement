const express = require('express');
const { login, register, logout, changePassword } = require('../controllers/authController');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Route for user login
router.post('/login', login);

// Route for user registration
router.post('/register', register);
// Logout route
router.post('/logout', authenticate, logout);

// Change password route
router.post('/change-password', authenticate, changePassword);

module.exports = router;
