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
    defaultValue : "{}"
  },
  turn: {
    type: DataTypes.STRING,
    defaultValue : "player_one"
  },
  player_one: {
    type: DataTypes.STRING
  },
  player_two: {
    type: DataTypes.STRING
  }
})

Game.addHook('beforeUpdate', async (game) => {
  game.state = await JSON.parse(game.state);
  return game;
})

module.exports = Game;