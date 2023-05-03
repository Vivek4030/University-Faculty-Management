"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("faculty-members", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      designation: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      profilePic: {
        type: Sequelize.STRING(1000),
        defaultValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAz5ZMtOlPePvdHVDVKsx5LwBg2I6P7lAPb3kiqwa1C4MBqoByPu_NSKt9vybLck-jUciP5GLmtFE&usqp=CAU&ec=48665698",
        allowNull: true,
      },
      addressLine1: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      addressLine2: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      googleScholar: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      researchGate: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      cv: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      education: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      interests: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      honors: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      publications: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      projects: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      achievements: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("faculty-members");
  },
};
