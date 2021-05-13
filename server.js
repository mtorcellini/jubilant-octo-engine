// express
const express = require('express');
const sequelize = require('./config/connection.js');
const routes = require('./routes');
const app = express();

// set up handlebars engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());
// app.use(express.urlencoded({extended:true}))


// set up public folder for client side assets
app.use(express.static('public'));

app.use(routes);

app.get('/', (req, res) => {
  // res.render('home');
  res.render('game');
})

sequelize.sync({alter : true}).then(() => {
  app.listen(3000)
})
