// express
const express = require('express');

// set up handlebars engine
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.listen(3000);