const router = require('express').Router();
const {Game} = require('../models');

router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
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
    const gameData = await Game.update({...req.body}, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    res.json(gameData);
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;