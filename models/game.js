const {DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

const Game = sequelize.define('Game', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  winner : {
    type: DataTypes.STRING,
  },
  loser: {
    type: DataTypes.STRING,
  },
  tie: {
    type: DataTypes.BOOLEAN,
  },
  state: {
    type: DataTypes.JSON,
  }
})

module.exports = Game;