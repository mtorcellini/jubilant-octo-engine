// express
const express = require('express');

// set up handlebars engine
const exphbs = require('express-handlebars');

const app = express();

// set up public folder for client side assets
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
  // res.render('home');
  res.render('game');
})

app.listen(3000);