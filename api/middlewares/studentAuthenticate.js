const jwt = require('jsonwebtoken');
const { Student } = require('../models');
require('dotenv').config();

const authenticateStudent = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can access this resource' });
    }

    const student = await Student.findByPk(decoded.id);

    if (!student) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateStudent;
