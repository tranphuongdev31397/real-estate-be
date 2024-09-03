"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Media", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        type: Sequelize.UUID,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      publicId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      relation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relationId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
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
    await queryInterface.dropTable("Media");
  },
};
