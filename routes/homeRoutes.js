const router = require('express').Router();
const {Game} = require('../models')

router.get('/', (req, res) => {
  res.render('home');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/game', (req, res) => {
  res.render('game');
})

router.get('/games', (req, res) => {
  // get list of existing games
  Game.findAll()
  .then(games => games.map(game => game.get({plain: true})))
  .then(games => {
    res.render('games', {games})
  })
})

module.exports = router;