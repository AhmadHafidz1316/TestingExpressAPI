"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "Iphone",
          description:
            "iPhone adalah rangkaian smartphone yang dirancang dan dipasarkan oleh Apple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Samsung",
          description:
            "Samsung adalah rangkaian smartphone yang dirancang dan dipasarkan oleh Samsung",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Xiaomi",
          description:
            "Xiaomi adalah rangkaian smartphone yang dirancang dan dipasarkan oleh Redmi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Categories', null, {});
  },
};
