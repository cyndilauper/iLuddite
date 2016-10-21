const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');
const requestPromise = require('request-promise');
const google = require('../config/googleBooksAPI');
const async = require('async');

router.get('/', (req, res, next) => {
  //returns all books
  Books.find({}, (err, books) => {
    if (err) {
      res.send(err);
      console.log('find all books error:', err);
    }
    else res.send(books);
  })
})

//endpoint for navbar search of 3P API by title
router.get('/search/:searchterm', (req, res) => {
  let titleSearched = req.params.searchterm;
  let options = {
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + titleSearched + '&key=' + google,
    json: true
  }

  function getBooks(body) {
    body = body.items.slice(0,5);
    let five = body.map(book => {
      try {
        return {
          _id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors[0],
          description: book.volumeInfo.description,
          coverPath: book.volumeInfo.imageLinks.thumbnail,
          thumbnailPath: book.volumeInfo.imageLinks.thumbnail
        };
      }
      catch(err) {
        return null;
      }
    }).filter(book => {
      if (book) {
        return book;
      }
    })
    res.send(five);
  }

  //make the API call to get the books
  requestPromise(options)
  .then((rawBooks) => getBooks(rawBooks))
  .catch((err) => {
    res.send(err);
    console.log('error in api call to google books:', err);
  })
})

//endpoint for retrieving books from db
router.get('/:isbn', (req, res, next) => {
  Books.find({_id: req.params.isbn}, (err, book) => {
    if (err) {
      res.send(err);
      console.log('error in finding book:', err);
    } else {
      res.send(book);
    }
  })
})

module.exports = router;
