const mongoose = require('mongoose');

const notesDataSchema = new mongoose.Schema({
  time: {type: String, required: true},
  creator: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  thumbnail: String,
  image: String,
  original: String
});

module.exports = mongoose.model('notes', notesDataSchema);
