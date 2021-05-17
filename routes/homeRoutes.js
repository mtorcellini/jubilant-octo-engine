const router = require('express').Router();
const {Game} = require('../models')

router.get('/', (req, res) => {
  res.render('home');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/newgame', (req, res) => {
  res.render('game', {isNewgame : true});
})

router.get('/games', (req, res) => {
  // get list of existing games
  Game.findAll()
  .then(games => games.map(game => game.get({plain: true})))
  .then(games => {
    res.render('games', {games})
  })
})

router.get('/games/:id', (req, res) => {

  // set a session var for this game id
  req.session.currentGame = req.params.id;

  // render the game page
  res.render('game', {isNewgame : false})
})

module.exports = router;