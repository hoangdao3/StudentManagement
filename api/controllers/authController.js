const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Teacher, Student } = require('../models');
require('dotenv').config();

// Login controller
const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role || (role !== 'teacher' && role !== 'student')) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    let user;
    if (role === 'teacher') {
      user = await Teacher.findOne({ where: { email } });
    } else if (role === 'student') {
      user = await Student.findOne({ where: { email } });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(role === 'teacher'){
      const token = jwt.sign({ id: user.teacher_id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

    }
    else{
      const token = jwt.sign({ id: user.student_id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Register controller
const register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role || (role !== 'teacher' && role !== 'student')) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    let user;
    if (role === 'teacher') {
      const existingTeacher = await Teacher.findOne({ where: { email } });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      user = await Teacher.create({
        full_name: 'John Doe',
        address: '123 Main St',
        phone_number: '123-456-7890',
        date_of_birth: '1990-01-01',
        username: email,
        password: password,
        email: email
      });
    } else if (role === 'student') {
      const existingStudent = await Student.findOne({ where: { email } });
      if (existingStudent) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      user = await Student.create({
        full_name: 'John Doe',
        address: '123 Main St',
        parent_phone_number: '123-456-7890',
        date_of_birth: '1990-01-01',
        username: email,
        password: password,
        email: email
      });
    }
    console.log(user.teacher_id);
    console.log(user.student_id);
    if(user.teacher_id != undefined){
      const token = jwt.sign({ id: user.teacher_id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

    }
    else{
      const token = jwt.sign({ id: user.student_id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

// Logout controller
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

// Change password controller
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.id; // Access req.user.id instead of req.id
  const role = req.role;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: 'New passwords do not match' });
  }

  try {
    let user;
    if (role === 'teacher') {
      user = await Teacher.findByPk(userId);
    } else if (role === 'student') {
      user = await Student.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(currentPassword)

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  login,
  register,
  logout,
  changePassword,
};
