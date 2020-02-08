const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  genre: String,
  name: String,
  authorId: String,
})

module.exports = mongoose.model('Book', bookSchema);