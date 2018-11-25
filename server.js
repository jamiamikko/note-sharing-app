'use strict';

require('dotenv').config();
const path = require('path');

const index = require('./routes/index');

const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening to port' + port);
});

app.use('/', index);
