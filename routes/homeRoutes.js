const router = require('express').Router();
const {Game} = require('../models');
const withAuth = require('../util/auth');

router.get('/', (req, res) => {
  res.render('home', {
    loggedIn : req.session.loggedIn
  });
})

router.get('/login', (req, res) => {
  res.render('login', {
    loggedIn: req.session.loggedIn
  });
})

router.get('/newgame', withAuth, (req, res) => {
  res.render('game', {
    loggedIn: req.session.loggedIn,
    isNewgame: true
  });
})

router.get('/games', withAuth, (req, res) => {
  // get list of existing games
  Game.findAll()
  .then(games => games.map(game => game.get({plain: true})))
  .then(games => {
    res.render('games', {games, loggedIn: req.session.loggedIn})
  })
})

router.get('/games/:id', (req, res) => {

  // set a session var for this game id
  req.session.currentGame = req.params.id;

  // render the game page
  res.render('game', {loggedIn: req.session.loggedIn, isNewgame : false})
})

module.exports = router;