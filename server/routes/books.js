const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/books');
const db = require('../config/db');

router.get('/', (req, res, next) => {
  //returns all books
  Book.find({}, function(err, books) {
    if (err) console.log('get all books err:', err);
    else res.json(books);
    next();
  })
})

router.get('/:bookId', (req, res, next) => {
  //check req.body for correct param, OR use getBookByISBN static method
  Book.find({isbn: req.body.isbn}, function(err, book) {
    if (err) console.log('get book err:', err);
    else res.json(book);
  })
})

module.exports = router;
