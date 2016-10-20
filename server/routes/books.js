const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');
const requestPromise = require('request-promise');
const async = require('async');

router.get('/', (req, res, next) => {
  //returns all books
  Books.find({}, (err, books) => {
    if (err) {
      res.send(err);
    } else {
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

  function getBooks(body) {
    let firstFiveBooks = body.items.slice(0,6);

    //shape the data returned for the first five books for the navbar and for insertion into the db
    let shapedFiveBooks = firstFiveBooks.map(book => {
      // console.log(book.volumeInfo.imageLinks);
      function isbnTenGetter(){
        var isbns = book.volumeInfo.industryIdentifiers;
        if (isbns[0].type == 'ISBN_10') {
          return isbns[0].identifier;
        } else {
          return isbns[1].identifier;
        }
      }

      let isbn = isbnTenGetter();

      return {
        _id: isbn,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        summary: book.volumeInfo.description,
        coverPath: book.volumeInfo.imageLinks.thumbnail,
        thumbnailPath: book.volumeInfo.imageLinks.smallThumbnail,
        coverPhoto: { contentType: 'image/jpg' },
        thumbnail: { contentType: 'image/jpg' }
      }
    })
    return shapedFiveBooks;
  }

  //okay here's where the magic begins.  make the starter API call to get the book list
  requestPromise(options)
  .then(rawBooks => { return getBooks(rawBooks) })
  .then(fiveBooks => {
    //mmmkay now we're going to get the cover photos for the books and store them
    //this silly done function is req'd by the async module.  the second argument to async.map is an iteratee that takes as *its* second argument a (req'd) done callback
    let done = function(err, book) { return book; }
    let booksWithCover = async.map(fiveBooks, (book, done) => {
      // var coverPath = 'http://covers.openlibrary.org/b/isbn/' + book.isbn + '-L.jpg';
      let coverPath = book.coverPath;
      let options = {
        url: coverPath,
        encoding: 'binary'
      }

      request(options, (err, res, body) => {
        //pop that binary data into the book.coverPhoto.data property, son
        if (!err && res.statusCode == 200) {
          body = new Buffer(body, 'binary');
          //convert into a base64 string
          body = body.toString('base64');
          book.coverPhoto.data = body;
          done(null, book);
        }
      })
    }, (err, result) => {
      //the third argument to the async.map call is a function that does something with the result.  the .then chain from our original request-promise (rp) wasn't playing nicely so we're going to nest the call for the thumbnails here
      let thumbBooks = async.map(result, (book, done) => {
        // var thumbnailPath = 'http://covers.openlibrary.org/b/isbn/' + book.isbn + '-S.jpg';
        let thumbnailPath = book.thumbnailPath;
        let options = {
          url: thumbnailPath,
          encoding: 'binary'
        }

        request(options, (err, res, body) => {
          //pop that binary data into the book.thumbnail.data property, son
          if (!err && res.statusCode == 200) {
            body = new Buffer(body, 'binary');
            //convert into a base64 string
            body = body.toString('base64');
            book.thumbnail.data = body;
            done(null, book);
          }
        })
      }, (err, result) => {
        //bomb.  same deal, this function is the third argument to the async.map that grabbed our thumbnails.  so 'result' here is errythang we need, primed for db insertion
        Books.insertMany(result, answer => {
          console.log(`Data Inserted:`, answer)
        })
        res.send(result);
      })
    })
  })
  //jesus, the nesting, it hurts.  sorry
})

//endpoint for retrieving books from db
router.get('/:isbn', (req, res, next) => {

  //check req.params for correct param, OR use getBookByISBN static method
  Books.find({_id: req.params.isbn}, (err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  })
})

module.exports = router;
