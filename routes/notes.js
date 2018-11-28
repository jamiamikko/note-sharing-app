const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const moment = require('moment');
const fs = require('fs');

const newNoteContent = require('../views/newNote.json');
const viewNoteCotent = require('../views/viewNote.json');

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

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  NotesData.findById(id, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(data);
    }
  });
});

const convertImage = (file, height, width) =>
  new Promise((resolve, reject) => {
    const newName =
      file.destination +
      file.filename.split('.')[0] +
      '_' +
      height +
      'x' +
      width +
      path.extname(file.originalname);

    sharp(file.path)
      .resize(height, width)
      .toFile(newName, (err, info) => {
        if (err) reject(err);
        else resolve(newName);
      });
  });

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, callback) => {
    callback(null, uuid() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage}).single('image');

router.put('/', upload, (req, res, next) => {
  if (!req.body.title || !req.body.creator || !req.body.content) {
    throw new Error('Invalid request');
  }

  const date = moment().format('MMMM Do YYYY, h:mm');

  const data = {
    time: date,
    creator: req.body.creator,
    title: req.body.title,
    content: req.body.content
  };

  if (req.file) {
    data.original = req.file.path.replace('public/', '');
    convertImage(req.file, 350, 200)
      .then((response) => {
        data.thumbnail = response.replace('public/', '');

        convertImage(req.file, 768, 432)
          .then((response) => {
            data.image = response.replace('public/', '');

            const noteData = new NotesData(data);
            noteData.save().then(() => {
              res.sendStatus(200);
            });
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    const noteData = new NotesData(data);
    noteData
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  NotesData.findOne({_id: id}, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      const imagePaths = [data.original, data.thumbnail, data.image];

      imagePaths.forEach((path) => {
        fs.unlink('public/' + path, (err) => {
          if (err) next(err);
        });
      });

      NotesData.deleteOne({_id: id}, (err) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.get('/new', (req, res) => {
  return res.render('newNote', {
    title: 'Note sharing app - New note',
    content: newNoteContent
  });
});

router.get('/view/:id', (req, res) => {
  return res.render('viewNote', {
    title: 'Note sharing app - View note',
    content: viewNoteCotent
  });
});

module.exports = router;
