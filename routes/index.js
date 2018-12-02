const express = require('express');
const router = express.Router();
const indexContent = require('../views/index.json');
const loginContent = require('../views/login.json');
const registerContent = require('../views/register.json');

router.get('/', (req, res) => {
  if (req.user) {
    return res.render('index', {
      title: 'Note sharing app - Home',
      content: indexContent
    });
  }

  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login', content: loginContent});
});

router.get('/register', (req, res) => {
  res.render('register', {title: 'Login', content: registerContent});
});

module.exports = router;
