const express = require('express');
const router = express.Router();
const content = require('../views/newNote.json');

const NotesData = require('../db/Note');

router.get('/', (req, res, next) => {
  NotesData.find({}, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/new', (req, res) => {
  return res.render('newNote', {
    title: 'Note sharing app - New note',
    content: content
  });
});

module.exports = router;
