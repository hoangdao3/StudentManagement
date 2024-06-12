const express = require('express');
const { login, register, logout, changePassword } = require('../../api/controllers/authController');

const authenticate = require('../../api/middlewares/authenticate');

const router = express.Router();
// console.log('authRoute')
router.post('/login', login);

router.post('/register', register);
router.post('/logout', authenticate, logout);

router.post('/change-password', authenticate, changePassword);

module.exports = router;
