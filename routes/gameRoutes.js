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
    if (!req.session.startedGame) {
      req.session.playerToken = "o";
      
      // update User with playerToken
      await User.update({token : "o"}, {
        where : {
          id: req.session.userId
        }
      })
    }
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

    // game creator is x
    req.session.startedGame = true;
    req.session.playerToken = "x";

    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
})

// update a game state with a move
router.put('/', async (req, res) => {
  try {
    // update database with move
    const data = await Game.update({state: req.body}, {
      where: {
        id: req.session.currentGame
      }
    })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

})

router.delete('/', async (req, res) => {
  try {
    await Game.destroy({
      where: {
        id: req.session.currentGame
      }
    })
    req.session.startedGame = false;
    res.status(200).json()
  } catch (err) {
    res.redirect('/');
  }
})

module.exports = router;