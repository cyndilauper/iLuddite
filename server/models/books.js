const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  //setup book schema
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
