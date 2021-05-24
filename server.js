/* 
<one line to give the program's name and a brief idea of what it does.>
Copyright (C) 2021  Matt Torcellini

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. 
*/


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

sequelize.sync({alter: true}).then(() => {
  app.listen(3000)
})
