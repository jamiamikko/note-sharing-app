const express = require('express');
const router = express.Router();
const indexContent = require('../views/index.json');

router.get('/', (req, res) => {
  return res.render('index', {
    title: 'Note sharing app',
    content: indexContent
  });
});

module.exports = router;
