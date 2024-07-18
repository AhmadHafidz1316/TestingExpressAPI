"use strict";
const { v4 } = require("uuid");
const Bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await Bcrypt.genSaltSync(10);
    const adminId = await queryInterface.rawSelect(
      "Roles",
      {
        where: { name: "Admin" },
      },
      ["id"]
    );
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id : v4(),
          name: "admin",
          email : "admin@gmail.com",
          password : Bcrypt.hashSync('12345678', salt),
          role_id: adminId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  },
};
