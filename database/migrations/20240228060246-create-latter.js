"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Latters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      latterType: {
        type: Sequelize.ENUM(["Surat Pengantar", "Surat Keterangan"]),
      },
      fullName: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM(["Pria", "Wanita"]),
      },
      placeDateBday: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM(["Belum Kawin", "Kawin", "Janda/Duda"]),
      },
      religion: {
        type: Sequelize.STRING,
      },
      work: {
        type: Sequelize.STRING,
      },
      blood: {
        type: Sequelize.STRING,
      },
      citizenship: {
        type: Sequelize.ENUM(["WNI", "WNA"]),
      },
      nik: {
        type: Sequelize.STRING,
      },
      nkk: {
        type: Sequelize.STRING,
      },
      perpous: {
        type: Sequelize.STRING,
      },
      destinationAddress: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Latters");
  },
};
