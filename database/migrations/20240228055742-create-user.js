"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      noHome: {
        type: Sequelize.STRING,
      },
      placeDateBday: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.STRING,
      },
      blockHome: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM([
          "superAdmin",
          "sekretaris",
          "bendahara",
          "member",
        ]),
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
    await queryInterface.dropTable("Users");
  },
};
