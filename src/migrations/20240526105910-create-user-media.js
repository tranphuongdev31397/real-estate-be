"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserMedia", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      link: {
        type: Sequelize.STRING,
      },
      icon: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable("UserMedia");
  },
};
