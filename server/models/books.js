const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  author: String,
  isbn: Integer,
  authorInfo: String,
  summary: String,
  coverPhoto: { data: Buffer, contentType: String }
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
