'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Check if the foreign key constraint exists before removing it
      const [results] = await queryInterface.sequelize.query(`
        SELECT
          CONSTRAINT_NAME
        FROM
          information_schema.REFERENTIAL_CONSTRAINTS
        WHERE
          CONSTRAINT_SCHEMA = '${queryInterface.sequelize.config.database}'
          AND TABLE_NAME = 'Classes'
          AND CONSTRAINT_NAME = 'Classes_teacher_id_fkey';
      `, { transaction });

      if (results.length > 0) {
        // Remove foreign key constraint from Classes (if it exists)
        await queryInterface.removeConstraint('Classes', 'Classes_teacher_id_fkey', { transaction });
      }

      // Rename the existing primary key column
      await queryInterface.renameColumn('Teachers', 'teacher_id', 'id', { transaction });

      // Change the column type and set autoIncrement
      await queryInterface.changeColumn('Teachers', 'id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, { transaction });

      // Recreate foreign key constraint
      await queryInterface.addConstraint('Classes', {
        fields: ['teacher_id'],
        type: 'foreign key',
        name: 'Classes_teacher_id_fkey',
        references: {
          table: 'Teachers',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint('Classes', 'Classes_teacher_id_fkey', { transaction });

      await queryInterface.renameColumn('Teachers', 'id', 'teacher_id', { transaction });

      await queryInterface.changeColumn('Teachers', 'teacher_id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, { transaction });

      await queryInterface.addConstraint('Classes', {
        fields: ['teacher_id'],
        type: 'foreign key',
        name: 'Classes_teacher_id_fkey',
        references: {
          table: 'Teachers',
          field: 'teacher_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }, { transaction });
    });
  }
};
