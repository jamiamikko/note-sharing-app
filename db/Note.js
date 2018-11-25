const mongoose = require('mongoose');

const notesDataSchema = new mongoose.Schema({
  time: {type: String, required: true},
  creator: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  thumbnail: String,
  image: String,
  original: {type: String, required: true}
});

module.exports = mongoose.model('notes', notesDataSchema);
