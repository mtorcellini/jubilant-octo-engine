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
  Game.findAll({})
  .then(games => games.map(game => game.get({plain: true})))
  .then(games => {
    res.render('games', {games, loggedIn: req.session.loggedIn})
  })
})

router.get('/games/:id', (req, res) => {
  req.session.currentGameId = req.params.id;

  Game.findByPk(req.params.id)
  .then(game => {
      // if player_two is not assigned, assign player_two
      if (game.player_two == null) {
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
      } else {
        // if player_two IS assigned, just render the existing game without updating
        res.render('game', {
          loggedIn: req.session.loggedIn,
          isNewGame: false
        })
      }
    })
})

module.exports = router;