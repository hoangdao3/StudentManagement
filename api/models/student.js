const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Classes',
        key: 'class_id'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    hooks: {
      beforeCreate: async (student) => {
        student.password = await bcrypt.hash(student.password, 10);
      },
      beforeUpdate: async (student) => {
        if (student.changed('password')) {
          student.password = await bcrypt.hash(student.password, 10);
        }
      }
    }
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Class, { foreignKey: 'class_id' });
    Student.hasMany(models.Grade, { foreignKey: 'student_id' });
  };

  return Student;
};
