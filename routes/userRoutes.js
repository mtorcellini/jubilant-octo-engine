const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');

// create new user
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create({
      username : req.body.username,
      password : req.body.password
    });
    res.status(200).json("User Created")
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
      return res.status(400).json("Incorrect username or password");
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
  
    if (!validPassword) {
      return res.status(400).json("Incorrect username or password");
    }

    res.json('You are now logged in');



  } catch (err) {
    res.json(err);
  }
})




module.exports = router;