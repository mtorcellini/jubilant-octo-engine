
const Game = require('./game');
const User = require('./user');

// Game.belongsToMany(User, {through: 'UserGames'});
// User.belongsToMany(Game, {through: 'UserGames'});

module.exports = {Game, User};