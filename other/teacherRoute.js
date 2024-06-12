const express = require('express');
const router = express.Router();
const { getStudentsList } = require('../controllers/teacherController');
const authenticateTeacher = require('../middleware/authenticateTeacher');

router.get('/students', authenticateTeacher, getStudentsList);
router.get('/students-scores', authenticateTeacher, getAllStudentsScores);
router.get('/grades/semester2', authenticateTeacher, getGradesSemester2);
router.get('/achievements', authenticateTeacher, getAchievements);
router.post('/add-student', authenticateTeacher, addStudentToClass);
module.exports = router;
