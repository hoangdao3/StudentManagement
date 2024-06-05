module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
      class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teachers',
          key: 'teacher_id'
        }
      }
    });

    Class.associate = (models) => {
      Class.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
      Class.hasMany(models.Student, { foreignKey: 'class_id' });
    };

    return Class;
  };
