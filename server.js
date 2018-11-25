'use strict';

require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

app.engine(
  'handlebars',
  handlebars({
    extname: 'handlebars',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Listening to port' + port);
});
