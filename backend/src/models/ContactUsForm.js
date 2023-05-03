const Sequelize = require("sequelize");
const sequelize = require("../database/connection")

module.exports = sequelize.define("contact-us-form", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  },
});
