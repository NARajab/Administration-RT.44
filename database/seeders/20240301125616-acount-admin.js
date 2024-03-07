"use strict";

const { User } = require("../../app/models");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "KepalaRT",
        phoneNumber: "6281256145759",
        role: "superAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SekretarisRT",
        phoneNumber: "+628236576342564",
        role: "sekretaris",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BendaharaRT",
        phoneNumber: "+628236576342564",
        role: "bendahara",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "member RT",
        phoneNumber: "08123276319",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const adminPassword = process.env.PASSWORD_HASH;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(adminPassword, saltRounds);

    const users = await User.findAll();

    await queryInterface.bulkInsert("Auths", [
      {
        email: "pakrt@mail.com",
        password: hashedPassword,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "sekretaris@mail.com",
        password: hashedPassword,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "bendahara@mail.com",
        password: hashedPassword,
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "member@mail.com",
        password: hashedPassword,
        userId: users[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
