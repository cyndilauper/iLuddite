const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  isbn: Number,
  authorInfo: String,
  summary: String,
  coverPhoto: { data: Buffer, contentType: String }
});

bookSchema.methods.getBookByTitle = function(title){
  
}

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
