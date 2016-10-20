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
      res.statusCode(500).send(err);
      console.log('find all books error:', err);
    }
    else res.statusCode(200).send(books);
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
          thumbnailPath: book.volumeInfo.imageLinks.thumbnail,
          coverPhoto: { contentType: 'image/jpg' },
          thumbnail: { contentType: 'image/jpg' }
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
    return five;
  }

  //okay here's where the magic begins.  make the starter API call to get the book list
  requestPromise(options)
  .then((rawBooks) => getBooks(rawBooks))
  .catch((err) => {
    res.statusCode(500).send(err);
    console.log('error in api call to google books:', err);
  })
  .then((fiveBooks) => {
    //mmmkay now we're going to get the cover photos for the books and store them
    //this silly done function is req'd by the async module.  the second argument to async.map is an iteratee that takes as *its* second argument a (req'd) done callback
    let done = (err, book) => book;
    let booksWithCover = async.map(fiveBooks, (book, done) => {
      // let coverPath = 'http://covers.openlibrary.org/b/isbn/' + book.isbn + '-L.jpg';
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
        } else {
          res.statusCode(500).send(err);
          console.log('err inserting cover image data:', err);
        }
      })
    }, function(err, result) {
      if (err) {
        res.statusCode(500).send(err);
        console.log('err in first async map call:', err);
      }
      //the third argument to the async.map call is a function that does something with the result.  the .then chain from our original request-promise (rp) wasn't playing nicely so we're going to nest the call for the thumbnails here
      async.map(result, (book, done) => {
        // let thumbnailPath = 'http://covers.openlibrary.org/b/isbn/' + book.isbn + '-S.jpg';
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
          } else {
            res.statusCode(500).send(err);
            console.log('err inserting thumbnail image data:', err);
          }
        })
      }, function(err, result) {
        if (err) {
          res.statusCode(500).send(err);
          console.log('err in second async map call:', err);
        }
        //bomb.  same deal, this function is the third argument to the async.map that grabbed our thumbnails.  so 'result' here is errythang we need, primed for db insertion
        Books.insertMany(result, (err, answer) => {
          if (err) {
            res.statusCode(500).send(err);
            console.log('err inserting book to db:', err);
          }
          console.log(`Data Inserted:`, answer)
        })
        res.statusCode(200).send(result);
      })
    })
  })
  .catch((err) => res.statusCode(500).send(err))
  //jesus, the nesting, it hurts.  sorry
})

//endpoint for retrieving books from db
router.get('/:isbn', (req, res, next) => {
  Books.find({_id: req.params.isbn}, (err, book) => {
    if (err) {
      res.statusCode(500).send(err);
      console.log('error in finding book:', err);
    } else {
      res.statusCode(200).send(book);
    }
  })
})

module.exports = router;
