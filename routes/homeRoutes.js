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
  Game.findAll({
    where: {
      numplayers: 1
    }
  })
  .then(games => games.map(game => game.get({plain: true})))
  .then(games => {
    res.render('games', {games, loggedIn: req.session.loggedIn})
  })
})

router.get('/games/:id', (req, res) => {
  req.session.currentGameId = req.params.id;

  // set current games numplayers = 2
  Game.update({
      numplayers: 2,
      player_two: req.session.username,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.render('game', {
        loggedIn: req.session.loggedIn,
        isNewgame: false
      })
    })

})

module.exports = router;