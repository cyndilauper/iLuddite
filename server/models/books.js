const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const booksSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  summary: String,
  coverPath: String,
  thumbnailPath: String,
  coverPhoto: { data: Buffer, contentType: String },
  thumbnail: { data: Buffer, contentType: String}
});

var Books = mongoose.model('Books', booksSchema);
module.exports = Books;
