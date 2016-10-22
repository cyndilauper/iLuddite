const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Author = require('../models/authors');
const Books = require('../models/books');
const db = require('../config/db');
const request = require('request');
const xml = require('xml2js').parseString;

router.get('/search/:author', (req, res) => {
  let authorSearched = req.params.author;
  let options = {
    url: `https://www.goodreads.com/api/author_url/${authorSearched}?key=${process.env.goodreads}`
  }

  function getAuthorInfo(err, response, body) {
    if (!err && response.statusCode == 200) {
      body = xml('' + body, (err, result) => {
        let authorId = result.GoodreadsResponse.author[0].$.id;
        let options = {
          url: `https://www.goodreads.com/author/show/${authorId}?key=${process.env.goodreads}`
        }
        request(options, (err, response, body) => {
          if (!err && response.statusCode == 200) {
            body = xml('' + body, (err, result) => {
              // var books = [];
              // Books.find({
              //   author: result.GoodreadsResponse.author[0].name[0]
              // }, (err, books) => {
              //   books.forEach((book) => {
              //     books.push(book._id)
              //   });
              // })

              var author = new Author({
                name: result.GoodreadsResponse.author[0].name[0],
                description: result.GoodreadsResponse.author[0].about[0],
                photoPath: result.GoodreadsResponse.author[0].large_image_url[0],
              })

              author.save((err, docs) => {
                if (err) {
                  console.log(`Error in author insert: ${err}`);
                } else {
                  console.log(`Author inserted: ${docs}`);
                }
              });              

              res.send(author);
            })
          }
        })
      });
    } else {
      //error handler for request module attempt
      console.log(`Error in API call: ${err}`);
    }
  }

  //call the request module
  request(options, getAuthorInfo);

})

//endpoint for retrieving author from db
router.get('/:authorid', (req, res, next) => {
  Authors.find({_id: req.params.authorid}, (err, author) => {
    if (err) {
      console.log(`Error in finding author: ${err}`);
      res.send(err);
    } else {
      console.log(`Author found: ${author}`);
      res.send(author);
    }
  })
})

module.exports = router;
