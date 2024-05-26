"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("KeyTokens", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      privateKey: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      publicKey: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("KeyTokens");
  },
};
