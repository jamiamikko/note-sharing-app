'use strict';

require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const socket = require('socket.io');

require('./passport')(passport);

const index = require('./routes/index');
const notes = require('./routes/notes');
const auth = require('./routes/auth');

const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:3000/']);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Listening to port' + port);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('There is a connection', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (messageJson) => {
    socket.broadcast.emit('message', messageJson);
  });

  socket.on('join', (user) => {
    console.log('User: ' + user);
    socket.broadcast.emit('join', user);
  });
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
app.use('/login', auth(passport));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({error: err.message});
});
