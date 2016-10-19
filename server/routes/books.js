const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');
const google = require('../config/googleBooksAPI');

router.get('/', (req, res, next) => {
  // console.log('req.params:', req.params);

  //returns all books
  Books.find({}, function(err, books) {
    if (err) res.send(err);
    else res.send(books);
  })
})

//endpoint for navbar search of 3P API by title
router.get('/search/:searchterm', (req, res) => {
  var titleSearched = req.params.searchterm;
  var options = {
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + titleSearched + '&key=' + google
  }
  function callback(err, resp, body) {
    if (!err && res.statusCode == 200) {
      var allResult = JSON.parse(body);
      // var firstBook = allResult.items[0];
      var firstFiveBooks = allResult.items.slice(0,6);

      //shape the data returned for the first five books for the navbar and for insertion into the db
      var shapedFiveBooks = firstFiveBooks.map(function(book){
        console.log(book.volumeInfo.industryIdentifiers);
        // var isbnTen = book.volumeInfo.industryIdentifiers

        return {
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          summary: book.volumeInfo.description,
          //we use the ISBN-13
          isbn: (book.volumeInfo.industryIdentifiers)[0].identifier,
          //the imageLinks (formerly thumbnail) property is behaving very strangely. book.volumeInfo.imageLinks is an object with two properties, 'smallThumbnail' and 'thumbnail', and inserts fine this way, but book.volumeInfo.imageLinks.thumbnail throws an error "cannot read property thumbnail of undefined"
          imageLinks: book.volumeInfo.imageLinks
          // smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail
        }
      })

      //insert the five shaped books into the db
      shapedFiveBooks.forEach(function(book, idx){
        Books.create(book, function(err) {
          if (err) console.log('book insert err:', err);
          else console.log('book' + idx + ' inserted!');
        })
      })
      res.send(shapedFiveBooks);
    }
  }
  request(options, callback);
})

//endpoint for retrieving books from db
router.get('/:isbn', (req, res, next) => {

  //check req.params for correct param, OR use getBookByISBN static method
  Books.find({isbn: req.params.isbn}, function(err, book) {
    if (err) res.send(err);
    else res.send(book);
  })
})

module.exports = router;
