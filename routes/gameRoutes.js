const router = require('express').Router();
const {Game, User} = require('../models');

router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: User
    });
    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const gameData = await Game.create({});
    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
})

router.put('/:id', async (req, res) => {
  try {
    console.log('put request received');
    console.log(req.body);

    // update database with move
    await Game.update({state: req.body}, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }

  // try {
  //   const gameData = await Game.update({
  //     state: req.body
  //   }, {
  //     where: {
  //       id: req.params.id,
  //     },
  //     //individualHooks: true,
  //   });
  //   res.json(gameData);
  // } catch (err) {
  //   res.json(err);
  // }
})

module.exports = router;