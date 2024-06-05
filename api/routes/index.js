const express = require('express');
const authRoutes = require('./authRoutes'); // Import authRoutes
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const teacherAuthenticate = require('../middlewares/authenticateTeacher');

router.use('/auth', authRoutes);
router.put('/update-info', authenticate, updateUserInfo);
router.get('/grades/semester-2', teacherAuthenticate, getSemesterTwoGrades);
module.exports = router;
