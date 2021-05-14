const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/game', (req, res) => {
  res.render('game');
})

module.exports = router;