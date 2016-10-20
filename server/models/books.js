const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  summary: String,
  coverPath: String,
  thumbnailPath: String,
  coverPhoto: { data: Buffer, contentType: String },
  thumbnail: { data: Buffer, contentType: String}
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
