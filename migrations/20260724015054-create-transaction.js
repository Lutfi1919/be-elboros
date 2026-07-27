'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      judul: {
        type: Sequelize.STRING
      },
      nominal: {
        type: Sequelize.INTEGER
      },
      catatan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("Transactions", {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_transactions_user_id',
      references: {
        table: "Users",
        field: 'id'
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};