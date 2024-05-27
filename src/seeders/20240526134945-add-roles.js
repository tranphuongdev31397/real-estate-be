"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        id: Sequelize.literal("gen_random_uuid()"),
        code: "ADMIN",
        value: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        code: "AGENT",
        value: "AGENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        code: "OWNER",
        value: "OWNER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        code: "USER",
        value: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
