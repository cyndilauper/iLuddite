const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');

router.get('/', (req, res, next) => {
  //returns all books
  Books.find({}, function(err, books) {
    if (err) console.log('get all books err:', err);
    else res.send(books);
    next();
  })
})

router.get('/:bookId', (req, res, next) => {
  //check req.body for correct param, OR use getBookByISBN static method
  Books.find({isbn: req.body.isbn}, function(err, book) {
    if (err) console.log('get book err:', err);
    else res.send(book);
    next();
  })
})

module.exports = router;
