const {Sequelize, sequelize} = require('../queries');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isActivated: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  activationLink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  info: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;