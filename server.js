// express
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection.js');
const routes = require('./routes');
const app = express();

// set up handlebars engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({extended:true}))

// set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// set up public folder for client side assets
app.use(express.static('public'));

app.use(routes);

// app.get('/', (req, res) => {
//   res.render('home');
// })

sequelize.sync({alter : true}).then(() => {
  app.listen(3000)
})
