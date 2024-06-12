const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const verifyStudent = require('../middlewares/studentAuthentication');

router.get('/profile', verifyStudent, studentController.getProfile);

router.get('/grades', verifyStudent, studentController.getGrades);

module.exports = router;
