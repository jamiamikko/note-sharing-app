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
const editNoteCotent = require('../views/editNote.json');

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

router.get('/get/:id', (req, res, next) => {
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

router.post('/:id', upload, (req, res, next) => {
  if (!req.body) {
    throw new Error('Invalid request');
  }

  const id = req.params.id;

  NotesData.findById(id, (err, note) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if (req.file) {
        const imagePaths = [note.original, note.thumbnail, note.image];

        imagePaths.forEach((path) => {
          fs.unlink('public/' + path, (err) => {
            if (err) next(err);
          });
        });

        const originalPath = req.file.path.replace('public/', '');

        convertImage(req.file, 350, 200)
          .then((response) => {
            const thumbnailPath = response.replace('public/', '');

            convertImage(req.file, 768, 432)
              .then((response) => {
                const imagePath = response.replace('public/', '');

                note.set({
                  title: req.body.title,
                  content: req.body.content,
                  thumbnail: thumbnailPath,
                  original: originalPath,
                  image: imagePath
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
        note.set({
          title: req.body.title,
          content: req.body.content
        });
      }

      note.save((err, updatedData) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          console.log(updatedData);
          res.send(updatedData);
        }
      });
    }
  });
});

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
  const id = req.params.id;

  return res.render('viewNote', {
    title: 'Note sharing app - View note',
    content: viewNoteCotent,
    id: id
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  NotesData.findById(id, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      return res.render('editNote', {
        title: 'Note sharing app - Edit note',
        content: editNoteCotent,
        noteTitle: data.title,
        noteContent: data.content,
        noteImage: data.image
      });
    }
  });
});

module.exports = router;
