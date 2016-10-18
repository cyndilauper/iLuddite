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

bookSchema.statics.getBookByISBN = function(isbn){
  Book.findOne({isbn: isbn}, function(err, book) {
    if (err) console.log('get book error:', err);
    //TODO: do stuff with the book
    console.log(book);
  })
}

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
