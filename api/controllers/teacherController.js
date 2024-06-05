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

module.exports = {
  getStudentsList,
};
