const jwt = require('jsonwebtoken');
const { Student } = require('../models');

const verifyStudent = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findByPk(decoded.id);

    if (!student) {
      return res.status(401).json({ message: 'Access denied. Not a student.' });
    }

    req.user = student;
    console.log(student)
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyStudent;
