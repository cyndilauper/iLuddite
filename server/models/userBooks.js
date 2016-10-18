//As it turns out, these subdocuments may be unnecessary, commenting out for now


// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const userBooksSchema = new Schema({
//   title: String,
//   author: String,
//   isbn: Number,
//   authorInfo: String,
//   summary: String,
//   coverPhoto: { data: Buffer, contentType: String }
// });

// userBooksSchema.statics.getBookByISBN = function(isbn){
//   UserBooks.findOne({isbn: isbn}, function(err, book) {
//     if (err) console.log('get book error:', err);
//     //TODO: do stuff with the book
//     else console.log(book);
//   })
// }

// userBooksSchema.statics.findAndRemove = function(isbn){
//   UserBooks.findOneAndRemove({isbn: isbn}, function(err) {
//     if (err) console.log('find and remove error:', err);
//     else console.log('book deleted');
//   })
// }

// var UserBooks = mongoose.model('UserBooks', userBooksSchema);
// module.exports = UserBooks;
