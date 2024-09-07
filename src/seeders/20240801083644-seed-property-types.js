"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "PropertyTypes",
      [
        {
          name: "Apartment",
          description:
            "A self-contained housing unit that occupies only part of a building.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Villa",
          description: "A large and luxurious country house.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Condominium",
          description:
            "A building or complex of buildings containing a number of individually owned apartments or houses.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Townhouse",
          description:
            "A tall, narrow, traditional row house, generally having three or more floors.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bungalow",
          description:
            "A low house having only one story or, in some cases, upper rooms set in the roof, typically with dormer windows.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cottage",
          description: "A small house, typically one in the country.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Penthouse",
          description:
            "An apartment on the highest floor of a building, typically luxurious.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Duplex",
          description:
            "A house divided into two apartments, with a separate entrance for each.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Studio",
          description:
            "A small apartment with a combined living and sleeping area.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Loft",
          description:
            "A large, open space, often converted from a warehouse or industrial building.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mansion",
          description: "A large, impressive house.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cabin",
          description: "A small wooden house, especially in a rural area.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Farmhouse",
          description:
            "A house attached to a farm, especially the main house in which the farmer lives.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chalet",
          description:
            "A wooden house or cottage with overhanging eaves, typically found in the Swiss Alps.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ranch",
          description:
            "A large farm, especially in the western US and Canada, where cattle or other animals are bred and raised.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile Home",
          description:
            "A large house trailer that is parked in one particular place and used as a permanent living accommodation.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Houseboat",
          description:
            "A boat that has been designed or modified to be used primarily as a home.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yurt",
          description:
            "A circular tent of felt or skins on a collapsible framework, used by nomads in Mongolia, Siberia, and Turkey.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Treehouse",
          description:
            "A structure built among the branches of a tree for children to play in.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Igloo",
          description:
            "A dome-shaped Eskimo house, typically built from blocks of solid snow.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("PropertyTypes", null, {});
  },
};
