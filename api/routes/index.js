const express = require("express");
const teacherRoutes = require("./teacherRoutes")
const studentRoutes = require("./studentRoutes")
const authRoutes = require("./authRoutes"); // Import authRoutes
const verifyStudent = require("../middlewares/studentAuthentication");
const verifyTeacher = require("../middlewares/teacherAuthentication");
// const authenticate = require('../middlewares/authenticate');
const router = express.Router();
// const teacherAuthenticate = require('../middlewares/authenticateTeacher');

router.use("/auth", authRoutes);
router.get("/student/dashboard", verifyStudent, (req, res) => {
  res.send("Welcome to student dashboard");
});
router.use('/teacher', verifyTeacher, teacherRoutes);
router.use("/student",  verifyStudent, studentRoutes)
router.get("/teacher/dashboard", verifyTeacher, (req, res) => {
  res.send("Welcome to teacher dashboard");
});
// router.put('/update-info', authenticate, updateUserInfo);
// router.get('/grades/semester-2', teacherAuthenticate, getSemesterTwoGrades);
module.exports = router;
