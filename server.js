'use strict';

require('dotenv').config();
const path = require('path');

const index = require('./routes/index');

const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine(
  'mustache',
  mustacheExpress({
    extname: 'mustache',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Listening to port' + port);
});

app.use('/', index);
