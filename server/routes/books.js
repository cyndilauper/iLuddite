const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');

router.get('/', (req, res, next) => {
  //returns all books
  Books.find({}, (err, books) => {
    if (err) {
      console.log(`Find all books error: ${err}`);
      res.send(err);
    } else {
      console.log(`Find all books: ${books}`);
      res.send(books);
    }
  })
})

//endpoint for navbar search of 3P API by title
router.get('/search/:searchterm', (req, res) => {
  let titleSearched = req.params.searchterm;
  let options = {
    url: `https://www.googleapis.com/books/v1/volumes?q=${titleSearched}&key=${process.env.gbKey}`,
    json: true
  }

  function getBooks(err, response, body) {
    if (!err && response.statusCode == 200) {
      //grab the first five books
      body = body.items.slice(0,5);
      let five = body.map(book => {
        //try to grab the properties we want, otherwise return null
        try {
          return {
            _id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            summary: book.volumeInfo.description,
            coverPath: book.volumeInfo.imageLinks.thumbnail,
            thumbnailPath: book.volumeInfo.imageLinks.thumbnail
          };
        }
        catch(err) {
          return null;
        }
        //get rid of the null books
      }).filter(book => {
        if (book) {
          return book;
        }
      })
      //insert all into the books collection
      Books.insertMany(five, (err, docs) => {
        if (err) {
          console.log(`Error in book insert: ${err}`);
        } else {
          console.log(`Books inserted: ${docs}`);
        }
      });
      //respond with the inserted books
      res.send(five);
    } else {
      //error handler for request module attempt
      console.log(`Error in API call: ${err}`);
    }
  }

  //call the request module
  request(options, getBooks);

})

//endpoint for retrieving books from db
router.get('/:bookid', (req, res, next) => {
  Books.find({_id: req.params.bookid}, (err, book) => {
    if (err) {
      console.log(`Error in finding book: ${err}`);
      res.send(err);
    } else {
      console.log(`Book found: ${book}`);
      res.send(book);
    }
  })
})

module.exports = router;
