const express = require('express');
const router = express.Router();
const { getSemesterTwoGrades } = require('../controllers/studentController');
const studentAuthenticate = require('../middleware/studentAuthenticate');
router.get('/grades/semester-2', studentAuthenticate, getSemesterTwoGrades);
router.put('/update-info', studentAuthenticate, updateUserInfo);

module.exports = router;
