const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    teacher_id: {
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
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
      beforeCreate: async (teacher) => {
        teacher.password = await bcrypt.hash(teacher.password, 10);
      },
      beforeUpdate: async (teacher) => {
        if (teacher.changed('password')) {
          teacher.password = await bcrypt.hash(teacher.password, 10);
        }
      }
    }
  });

  Teacher.associate = (models) => {
    Teacher.hasOne(models.Class, { foreignKey: 'teacher_id' });
  };

  return Teacher;
};
