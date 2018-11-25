'use strict';

require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const index = require('./routes/index');
const notes = require('./routes/notes');

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

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/notes`,
    {useNewUrlParser: true}
  )
  .then((db) => {})
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

app.use('/', index);
app.use('/notes', notes);
