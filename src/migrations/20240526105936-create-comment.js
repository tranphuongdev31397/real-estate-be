"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
