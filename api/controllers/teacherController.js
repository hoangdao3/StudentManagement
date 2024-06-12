const { Teacher, Class, Student } = require('../models');

const addStudentToClassByEmail = async (req, res) => {
    try {
      const { email } = req.body;

      const teacher = await Teacher.findByPk(req.user.teacher_id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      console.log(teacher)
      const classData = await Class.findOne({ where: { teacher_id: teacher.teacher_id } });
      if (!classData) {
        return res.status(404).json({ message: 'Class not found for this teacher' });
      }

      const student = await Student.findOne({ where: { email } });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      student.class_id = classData.class_id;
      await student.save();

      res.status(200).json({ message: 'Student added to class successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  const removeStudentFromClassByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const teacher = await Teacher.findByPk(req.user.teacher_id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const classData = await Class.findOne({ where: { teacher_id: teacher.teacher_id } });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found for this teacher' });
        }

        const student = await Student.findOne({ where: { email, class_id: classData.class_id } });
        if (!student) {
            return res.status(404).json({ message: 'Student not found in this class' });
        }

        student.class_id = null; // Remove student from class
        await student.save();

        res.status(200).json({ message: 'Student removed from class successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getStudentsByTeacher = async (req, res) => {
    try {
        console.log("-------------")
      const teacherId = req.user.teacher_id;
      console.log(teacherId)

      const teacherClass = await Class.findOne({ where: { teacher_id: teacherId } });

      if (!teacherClass) {
        return res.status(404).json({ message: 'Teacher class not found' });
      }

      const students = await Student.findAll({ where: { class_id: teacherClass.class_id } });

      res.json({ students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getGradeTableByTeacher = async (req, res) => {
    try {
      const teacherId = req.teacherId;

      // Tìm lớp của giáo viên
      const teacherClass = await Class.findOne({ where: { teacher_id: teacherId } });

      if (!teacherClass) {
        return res.status(404).json({ message: 'Teacher class not found' });
      }

      // Lấy bảng điểm của lớp
      const gradeTable = await Grade.findAll({
        where: { class_id: teacherClass.class_id },
        include: [{ model: Student }]
      });

      res.json({ gradeTable });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
  addStudentToClassByEmail,
  getStudentsByTeacher,
  getGradeTableByTeacher,
  removeStudentFromClassByEmail
};
