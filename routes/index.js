const router = require('express').Router();

const gameRoutes = require('./gameRoutes.js');

router.use('/game', gameRoutes);

module.exports = router;
