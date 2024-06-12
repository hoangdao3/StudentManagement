const jwt = require('jsonwebtoken');
const { Teacher } = require('../models');

const verifyTeacher = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findByPk(decoded.id);

    if (!teacher) {
      return res.status(401).json({ message: 'Access denied. Not a teacher.' });
    }

    req.user = teacher;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyTeacher;
