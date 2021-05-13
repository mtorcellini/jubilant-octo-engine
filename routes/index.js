const router = require('express').Router();

const gameRoutes = require('./gameRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/game', gameRoutes);
router.use('/user', userRoutes);

module.exports = router;
