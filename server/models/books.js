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

booksSchema.statics.getBookByISBN = function(isbn){
  Books.findOne({isbn: isbn}, function(err, book) {
    if (err) console.log('get book error:', err);
    //TODO: do stuff with the book
    console.log(book);
  })
}

var Books = mongoose.model('Books', booksSchema);
module.exports = Books;
