const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const gameRoutes = require('./gameRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use(homeRoutes);
router.use('/api/game', gameRoutes);
router.use('/api/user', userRoutes);

module.exports = router;
