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

/**
 * @api {get} /notes Get all notes
 * @apiName get-notes
 * @apiGroup Notes
 *
 * @apiDescription Endpoint for getting all available notes.
 *
 * @apiHeader {String} Content-type application/json
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *    [
 *      {
 *        "_id":"5c04147a9e28ac20656ed00b",
 *        "time":"December 2nd 2018, 7:20",
 *        "creator":"mikkoj",
 *        "title":"Testing again",
 *        "content":"Testing again",
 *        "original":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026.png",
 *        "thumbnail":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_350x200.png",
 *        "image":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_768x432.png",
 *        "__v":0
 *      }
 *    ]
 * @apiErrorExample Error-Response:
 *    400 Bad Request
 *    {
 *      "error": "Error message"
 *    }
 */

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

/**
 * @api {get} /notes/get/:id Get note with id
 * @apiName get-note-by-id
 * @apiGroup Notes
 *
 * @apiDescription Endpoint for getting single note by id.
 *
 * @apiParam {String} id Notes unique id.
 *
 * @apiHeader {String} Content-type application/json
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *     {
 *       "_id":"5c04147a9e28ac20656ed00b",
 *       "time":"December 2nd 2018, 7:20",
 *       "creator":"mikkoj",
 *       "title":"Testing again",
 *       "content":"Testing again",
 *       "original":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026.png",
 *       "thumbnail":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_350x200.png",
 *       "image":"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_768x432.png",
 *       "__v":0
 *     }
 * @apiErrorExample Error-Response:
 *    400 Bad Request
 *    {
 *      "error": "Error message"
 *    }
 */

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

/**
 * @api {post} /notes/:id Modify note with id
 * @apiName modify-note-by-id
 * @apiGroup Notes
 *
 * @apiDescription Endpoint for modifying single note by id.
 *
 * @apiParam {String} id Notes unique id.
 *
 * @apiHeader {String} Content-type  multipart/form-data
 *
 * @apiParamExample Request-Example
 *
 * ------WebKitFormBoundarytiHk8bSFedx4rzAW
 * Content-Disposition: form-data; name="title"
 *
 * Testing editing
 * ------WebKitFormBoundarytiHk8bSFedx4rzAW
 * Content-Disposition: form-data; name="creator"
 *
 * mikkoj
 * ------WebKitFormBoundarytiHk8bSFedx4rzAW
 * Content-Disposition: form-data; name="content"
 *
 * Testing editing
 * ------WebKitFormBoundarytiHk8bSFedx4rzAW
 * Content-Disposition: form-data; name="image"; filename="Screen Shot 2018-08-10 at 13.02.29.png"
 * Content-Type: image/png
 *
 * ------WebKitFormBoundarytiHk8bSFedx4rzAW--
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *     {
 *       "_id":"5c0566f29a220d0bddd60140",
 *       "time":"December 3rd 2018, 7:25",
 *       "creator":"mikkoj",
 *       "title":"Testing editing",
 *       "content":"Testing editing",
 *       "original":"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9.png",
 *       "thumbnail":"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9_350x200.png",
 *       "image":"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9_768x432.png",
 *       "__v":0
 *     }
 * @apiErrorExample Error-Response:
 *    400 Bad Request
 *    {
 *      "error": "Error message"
 *    }
 */

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

                note.save((err, updatedData) => {
                  if (err) {
                    console.log(err);
                    next(err);
                  } else {
                    res.send(updatedData);
                  }
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

        note.save((err, updatedData) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.send(updatedData);
          }
        });
      }
    }
  });
});

/**
 * @api {put} /notes/ Add new note
 * @apiName add-new-note
 * @apiGroup Notes
 *
 * @apiDescription Endpoint for adding new note.
 *
 *
 * @apiHeader {String} Content-type  multipart/form-data
 *
 * @apiParamExample Request-Example
 *
 * ------WebKitFormBoundaryYKP338JWcjjtPu3I
 * Content-Disposition: form-data; name="title"
 *
 * New note
 * ------WebKitFormBoundaryYKP338JWcjjtPu3I
 * Content-Disposition: form-data; name="creator"
 *
 * mikkoj
 * ------WebKitFormBoundaryYKP338JWcjjtPu3I
 * Content-Disposition: form-data; name="content"
 *
 * New note
 * ------WebKitFormBoundaryYKP338JWcjjtPu3I
 * Content-Disposition: form-data; name="image"; filename="yes.png"
 * Content-Type: image/png
 *
 * ------WebKitFormBoundaryYKP338JWcjjtPu3I--
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *    {
 *      "status": "OK"
 *    }
 * @apiErrorExample Error-Response:
 *    400 Bad Request
 *    {
 *      "error": "Error message"
 *    }
 */

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
              res.send(JSON.stringify({status: 'OK'}));
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
        res.send(JSON.stringify({status: 'OK'}));
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
});

/**
 * @api {delete} /notes/:id Delete note with id
 * @apiName delete-note-with-id
 * @apiGroup Notes
 *
 * @apiDescription Endpoint for deleting note with id.
 *
 * @apiParam {String} id Notes unique id.
 *
 * @apiHeader {String} Content-type  application/json
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *    {
 *      "status": "OK"
 *    }
 * @apiErrorExample Error-Response:
 *    400 Bad Request
 *    {
 *      "error": "Error message"
 *    }
 */

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
          res.send(JSON.stringify({status: 'OK'}));
        }
      });
    }
  });
});

router.get('/new', (req, res) => {
  if (req.user) {
    return res.render('newNote', {
      title: 'Note sharing app - New note',
      content: newNoteContent,
      username: req.user.username
    });
  }

  res.redirect('/login');
});

router.get('/view/:id', (req, res) => {
  if (req.user) {
    const id = req.params.id;

    return res.render('viewNote', {
      title: 'Note sharing app - View note',
      content: viewNoteCotent,
      id: id,
      username: req.user.username
    });
  }

  res.redirect('/login');
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  NotesData.findById(id, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if (req.user) {
        return res.render('editNote', {
          title: 'Note sharing app - Edit note',
          content: editNoteCotent,
          noteTitle: data.title,
          noteContent: data.content,
          noteImage: data.image,
          username: req.user.username
        });
      } else {
        res.redirect('/login');
      }
    }
  });
});

module.exports = router;
