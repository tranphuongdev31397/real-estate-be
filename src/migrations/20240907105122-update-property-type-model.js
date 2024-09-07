"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("PropertyTypes", "image");

    await queryInterface.addColumn("PropertyTypes", "imageId", {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("PropertyTypes", "imageId");
    await queryInterface.addColumn("PropertyTypes", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
