"use strict";
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: v4(),
          name: 'User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
     return await queryInterface.bulkDelete('Roles', null, {});
  },
};
