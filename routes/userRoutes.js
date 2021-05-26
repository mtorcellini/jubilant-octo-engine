const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');

// create new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username : req.body.username,
      password : req.body.password
    });
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.status(200).json({userData: userData, message: "You are now logged in"}); // don't actually send the password back in here
    })
  } catch (err) {
    res.json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
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
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      req.session.username = userData.username;
      res.status(200).json({userData: userData, message: "You are now logged in"});
    })
  } catch (err) {
    res.json(err);
  }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({message: 'logout'});
    });
  } else {
    console.log('logout called, but never logged in');
    res.status(404).end();
  }
})

// router.put('/', async (req, res) => {
//   try {
//     console.log('okay');
//     console.log(req.session.userId);
//     await User.update({token : req.body.token}, {
//       where : {
//         id : req.session.userId
//       }
//     });
//   } catch (err) {
//     res.json(err);
//   }
// })




module.exports = router;