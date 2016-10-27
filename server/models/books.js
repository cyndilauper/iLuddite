const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const booksSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  summary: String,
  coverPath: String,
  authorId: { type: Schema.Types.String, ref: 'Authors' },
  thumbnailPath: String
});

const Books = mongoose.model('Books', booksSchema);
module.exports = Books;
