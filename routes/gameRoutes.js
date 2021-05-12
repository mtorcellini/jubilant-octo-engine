const router = require('express').Router();
const {Game} = require('../models');

router.get('/:id', async (req, res) => {

});

router.post('/', async (req, res) => {
  const gameData = await Game.create({});
  res.json(gameData);
})

module.exports = router;