const jwt = require('jsonwebtoken');
const { Teacher, Student } = require('../models');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    let user;
    if (decoded.role === 'teacher') {
      user = await Teacher.findByPk(decoded.id);
    } else if (decoded.role === 'student') {
      user = await Student.findByPk(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
