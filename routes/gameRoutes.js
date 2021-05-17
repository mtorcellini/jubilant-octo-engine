const router = require('express').Router();
const {Game, User} = require('../models');

// get the state of a game
// router.get('/:id', async (req, res) => {
//   try {
//     const gameData = await Game.findByPk(req.params.id, {
//       include: User
//     });
//     res.json(gameData);
//   } catch (err) {
//     res.json(err);
//   }
// });

// get the state of a game (check for session var)
router.get('/', async (req, res) => {
  try {
    let gameData;
    console.log(req.session.currentGame);
    if (req.session.currentGame) {
      gameData = await Game.findByPk(req.session.currentGame, {
        include: User
      });
    } else {
      return res.json({message : "No game selected"})
    }
    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
})

// create a new game
router.post('/', async (req, res) => {
  try {
    const gameData = await Game.create({});

    // set session var with current game ID
    req.session.currentGame = gameData.id;

    // set random gamePiece
    

    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
})

// update a game state with a move
router.put('/:id', async (req, res) => {
  try {
    // update database with move
    const data = await Game.update({state: req.body}, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports = router;