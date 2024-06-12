const { Student, Grade } = require('../api/models');

const getSemesterTwoGrades = async (req, res) => {
  const studentId = req.id;

  try {
    const grades = await Grade.findAll({
      where: {
        student_id: studentId,
        semester: 2
      }
    });

    if (!grades.length) {
      return res.status(404).json({ message: 'No grades found for semester 2' });
    }

    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getSemesterTwoGrades,
};
