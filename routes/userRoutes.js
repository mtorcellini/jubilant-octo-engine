const router = require('express').Router();
const {User} = require('../models');

// create new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    res.json(userData);
  } catch (err) {
    res.json(err);
  }
})




module.exports = router;