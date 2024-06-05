const express = require('express');
const router = express.Router();
const { getSemesterTwoGrades } = require('../controllers/studentController');
const studentAuthenticate = require('../middleware/studentAuthenticate');

// Route for students to fetch their semester 2 grades
router.get('/grades/semester-2', studentAuthenticate, getSemesterTwoGrades);
router.put('/update-info', studentAuthenticate, updateUserInfo);

module.exports = router;
