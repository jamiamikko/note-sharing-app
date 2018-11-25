const express = require('express');
const router = express.Router();
const content = require('../views/newNote.json');

router.get('/', (req, res) => {
  return res.render('newNote', {
    title: 'Note sharing app - New note',
    content: content
  });
});

module.exports = router;
