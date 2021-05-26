
const Game = require('./Game');
const User = require('./User');

// Game.belongsToMany(User, {through: 'UserGames'});
// User.belongsToMany(Game, {through: 'UserGames'});

module.exports = {Game, User};