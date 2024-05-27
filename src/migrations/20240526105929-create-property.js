"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 3,
          max: 50,
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      listingType: {
        type: Sequelize.ENUM("SALE", "RENTAL"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("PENDING", "CANCELED", "APPROVED"),
        defaultValue: "PENDING",
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bedRoom: {
        type: Sequelize.INTEGER,
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      },
      propertySize: {
        type: Sequelize.FLOAT,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      postedBy: {
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
    await queryInterface.dropTable("Properties");
  },
};
