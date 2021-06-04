const router = require('express').Router();
const {
  Game,
  User
} = require('../models');

// CREATE NEW GAME
router.post('/', async (req, res) => {
  try {
    const gameData = await Game.create({
      player_one: req.session.username,
      state: {
        player_one: [],
        player_two: []
      }
    });
    req.session.currentGameId = gameData.id;
    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
});

// GET GAME DATA PERIODICALLY
router.get('/', async (req, res) => {
  try {
    let player;
    const gameData = await Game.findByPk(req.session.currentGameId);
    // IS THIS USER A PLAYER OR WHAT?
    if (req.session.username == gameData.player_one) {
      player = "player_one";
    } else if (req.session.username == gameData.player_two) {
      player = "player_two";
    }
    res.json({
      gameData: gameData,
      player: player,
    });
  } catch (err) {
    res.json(err);
  }
});

// UPDATE GAME WITH NEW MOVE
router.put('/', async (req, res) => {
  try {
    // switch player turn
    let {turn} = await Game.findByPk(req.session.currentGameId);
    let newTurn = (turn == "player_one") ? "player_two" : "player_one";

    await Game.update({
      state: req.body,
      turn : newTurn
    }, {
      where: {
        id: req.session.currentGameId
      }
    });
    res.status(200).json();
  } catch (err) {
    res.json(err)
  }
});

// DELETE GAME
router.delete('/', async (req, res) => {
  try {
    await Game.destroy({
      where: {
        id: req.session.currentGameId
      }
    });
    req.session.currentGameId = null;
    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
})

module.exports = router;