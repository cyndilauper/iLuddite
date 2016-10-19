const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');
const google = require('../config/googleBooksAPI');

router.get('/', (req, res, next) => {
  console.log('req.params:', req.params);

  //returns all books
  Books.find({}, function(err, books) {
    if (err) res.send(err);
    else res.send(books);
  })
})

//endpoint for navbar search of 3P API by title
router.get('/:title', (req, res) => {
  console.log('req:', req);
  var titleSearched = req.params.title;
  var options = {
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + titleSearched + '&key=' + google
  }
  function callback(err, res, body) {
    if (!err && res.statusCode == 200) {
      var book = JSON.parse(body);
      console.log('book:', book);
    }
  }
  request(options, callback);
})

//endpoint for retrieving books from db
router.get('/db/:isbn', (req, res, next) => {

  //check req.params for correct param, OR use getBookByISBN static method
  Books.find({isbn: req.params.isbn}, function(err, book) {
    if (err) res.send(err);
    else res.send(book);
  })
})

module.exports = router;
