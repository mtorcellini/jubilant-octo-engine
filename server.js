// express
const express = require('express');
const sequelize = require('./config/connection.js');
const routes = require('./routes');

// set up handlebars engine
const exphbs = require('express-handlebars');

const app = express();

// set up public folder for client side assets
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(routes);

app.get('/', (req, res) => {
  // res.render('home');
  res.render('game');
})

sequelize.sync({alter : true}).then(() => {
  app.listen(3000)
})
