const router = require('express').Router();
const {User} = require('../models');

// create new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    res.status(200).render('home')
  } catch (err) {
    res.json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({where: 
      {username: req.body.username}
    });

    if (!userData) {
      console.log('no user');
      res.status(400).json("Incorrect username or password");
    }

  } catch (err) {
    res.json(err);
  }
})




module.exports = router;