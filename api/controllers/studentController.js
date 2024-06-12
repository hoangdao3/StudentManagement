const { Student, Grade, Class } = require('../models');

const getProfile = async (req, res) => {
  try {
    console.log(req.user.student_id)
    const student = await Student.findByPk(req.user.student_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Class,
          attributes: ['class_name']
        }
      ]
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const getGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      where: { student_id: req.user.student_id },
      attributes: ['subject', 'semester', 'grade']
    });

    if (!grades) {
      return res.status(404).json({ message: 'No grades found' });
    }
    console.log('111111111111111111111')

    console.log(grades)
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  getProfile,
  getGrades
};
