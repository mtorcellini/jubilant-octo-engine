const {DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    notNull: true,
  },
  password: {
    type: DataTypes.STRING,
    notNull: true,
  }
})

module.exports = User;