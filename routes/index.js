const express = require('express');
const router = express.Router();
const User = require('../db/User');
const indexContent = require('../views/index.json');
const loginContent = require('../views/login.json');
const registerContent = require('../views/register.json');

router.get('/', (req, res) => {
  if (req.user) {
    return res.render('index', {
      title: 'Note sharing app - Home',
      content: indexContent,
      username: req.user.username
    });
  }

  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login', content: loginContent});
});

router.get('/register', (req, res) => {
  res.render('register', {title: 'Register', content: registerContent});
});

router.put('/register', (req, res, next) => {
  if (!req.body) {
    throw new Error('Invalid request');
  }

  const data = {
    username: req.body.username,
    password: req.body.password
  };

  const userData = new User(data);

  userData
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
