"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PropertyFeatures", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      featureId: {
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
    await queryInterface.dropTable("PropertyFeatures");
  },
};
