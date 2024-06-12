const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const verifyTeacher = require('../middlewares/teacherAuthentication');

router.post('/add-student', verifyTeacher, teacherController.addStudentToClassByEmail);
router.post('/remove-student', verifyTeacher, teacherController.removeStudentFromClassByEmail);

router.get('/class/students', verifyTeacher, teacherController.getStudentsByTeacher);
router.get('/grades/statistics', verifyTeacher, teacherController.getGradeTableByTeacher);
module.exports = router;
