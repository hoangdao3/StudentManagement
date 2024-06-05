const { Teacher, Class, Student } = require('../models');

const getStudentsList = async (req, res) => {
  const teacherId = req.id;

  try {
    const teacherClass = await Class.findOne({
      where: { teacher_id: teacherId },
      include: Student
    });

    if (!teacherClass) {
      return res.status(404).json({ message: 'Class not found for this teacher' });
    }

    res.json(teacherClass.Students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getGradesSemester2 = async (req, res) => {
    try {
      const grades = await Grade.findAll({
        where: { semester: 2 },
        include: Student,
      });

      const tableData = {};

      grades.forEach(grade => {
        const studentName = grade.Student.full_name;
        if (!tableData[studentName]) {
          tableData[studentName] = {};
        }
        tableData[studentName][grade.subject] = grade.grade;
      });

      const formattedData = [];
      for (const studentName in tableData) {
        const studentRow = { 'Student Name': studentName, ...tableData[studentName] };
        formattedData.push(studentRow);
      }

      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const getAchievements = async (req, res) => {
    try {
      const countAbove9 = await Student.count({
        include: [{
          model: Grade,
          where: { semester: 1 },
        }],
        having: sequelize.literal('AVG(Grades.grade) > 9.0'),
      });

      const countBetween8And9 = await Student.count({
        include: [{
          model: Grade,
          where: { semester: 1 },
        }],
        having: sequelize.literal('AVG(Grades.grade) >= 8.0 AND AVG(Grades.grade) < 9.0'),
      });

      const countBetween65And8 = await Student.count({
        include: [{
          model: Grade,
          where: { semester: 1 },
        }],
        having: sequelize.literal('AVG(Grades.grade) >= 6.5 AND AVG(Grades.grade) < 8.0'),
      });

      const countRemaining = await Student.count() - (countAbove9 + countBetween8And9 + countBetween65And8);

      res.json({
        countAbove9,
        countBetween8And9,
        countBetween65And8,
        countRemaining,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const addStudentToClass = async (req, res) => {
    const { email, className } = req.body;

    if (!email || !className) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      const student = await Student.findOne({ where: { email } });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const classInstance = await Class.findOne({ where: { class_name: className } });
      if (!classInstance) {
        return res.status(404).json({ message: 'Class not found' });
      }

      student.class_id = classInstance.class_id;
      await student.save();

      res.json({ message: 'Student added to class successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
module.exports = {
  getStudentsList,
  getGradesSemester2,
  getAchievements,
  addStudentToClass
};
