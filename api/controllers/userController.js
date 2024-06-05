const { Student, Teacher } = require('../models');

// Update user information controller
const updateUserInfo = async (req, res) => {
  const { full_name, address, phone_number, date_of_birth, username } = req.body;
  const userId = req.id;
  const role = req.role;

  if (!full_name || !address || !phone_number || !date_of_birth || !username) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    let user;
    if (role === 'teacher') {
      user = await Teacher.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      user.full_name = full_name;
      user.address = address;
      user.phone_number = phone_number;
      user.date_of_birth = date_of_birth;
      user.username = username;
    } else if (role === 'student') {
      user = await Student.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'Student not found' });
      }

      user.full_name = full_name;
      user.address = address;
      user.phone_number = phone_number; // Sử dụng phone_number thay cho parent_phone_number để đồng nhất
      user.date_of_birth = date_of_birth;
      user.username = username;
    }

    await user.save();

    res.json({ message: 'User information updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateUserInfo,
};
