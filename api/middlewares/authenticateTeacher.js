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

module.exports = authenticateTeacher;
