const jwt = require('jsonwebtoken');
const { Teacher } = require('../models');
require('dotenv').config();

const authenticateTeacher = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can access this resource' });
    }

    const teacher = await Teacher.findByPk(decoded.id);

    if (!teacher) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
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

module.exports = authenticateTeacher;
