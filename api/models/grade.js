module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define('Grade', {
      grade_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Students',
          key: 'student_id'
        }
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });

    Grade.associate = (models) => {
      Grade.belongsTo(models.Student, { foreignKey: 'student_id' });
    };

    return Grade;
  };
