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
          image: "https://picsum.photos/200?random=1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Villa",
          description: "A large and luxurious country house.",
          image: "https://picsum.photos/200?random=2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Condominium",
          description:
            "A building or complex of buildings containing a number of individually owned apartments or houses.",
          image: "https://picsum.photos/200?random=3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Townhouse",
          description:
            "A tall, narrow, traditional row house, generally having three or more floors.",
          image: "https://picsum.photos/200?random=4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bungalow",
          description:
            "A low house having only one story or, in some cases, upper rooms set in the roof, typically with dormer windows.",
          image: "https://picsum.photos/200?random=5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cottage",
          description: "A small house, typically one in the country.",
          image: "https://picsum.photos/200?random=6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Penthouse",
          description:
            "An apartment on the highest floor of a building, typically luxurious.",
          image: "https://picsum.photos/200?random=7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Duplex",
          description:
            "A house divided into two apartments, with a separate entrance for each.",
          image: "https://picsum.photos/200?random=8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Studio",
          description:
            "A small apartment with a combined living and sleeping area.",
          image: "https://picsum.photos/200?random=9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Loft",
          description:
            "A large, open space, often converted from a warehouse or industrial building.",
          image: "https://picsum.photos/200?random=10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mansion",
          description: "A large, impressive house.",
          image: "https://picsum.photos/200?random=11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cabin",
          description: "A small wooden house, especially in a rural area.",
          image: "https://picsum.photos/200?random=12",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Farmhouse",
          description:
            "A house attached to a farm, especially the main house in which the farmer lives.",
          image: "https://picsum.photos/200?random=13",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chalet",
          description:
            "A wooden house or cottage with overhanging eaves, typically found in the Swiss Alps.",
          image: "https://picsum.photos/200?random=14",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ranch",
          description:
            "A large farm, especially in the western US and Canada, where cattle or other animals are bred and raised.",
          image: "https://picsum.photos/200?random=15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile Home",
          description:
            "A large house trailer that is parked in one particular place and used as a permanent living accommodation.",
          image: "https://picsum.photos/200?random=16",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Houseboat",
          description:
            "A boat that has been designed or modified to be used primarily as a home.",
          image: "https://picsum.photos/200?random=17",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yurt",
          description:
            "A circular tent of felt or skins on a collapsible framework, used by nomads in Mongolia, Siberia, and Turkey.",
          image: "https://picsum.photos/200?random=18",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Treehouse",
          description:
            "A structure built among the branches of a tree for children to play in.",
          image: "https://picsum.photos/200?random=19",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Igloo",
          description:
            "A dome-shaped Eskimo house, typically built from blocks of solid snow.",
          image: "https://picsum.photos/200?random=20",
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
