const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Authors = require('../models/authors');
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
      body = xml('' + body, function(err, result) {
        let authorId = result.GoodreadsResponse.author[0].$.id;
        let options = {
          url: `https://www.goodreads.com/author/show/${authorId}?key=${process.env.goodreads}`
        }
        request(options, (err, response, body) => {
          if (!err && response.statusCode == 200) {
            body = xml('' + body, function(err, result) {
              res.send(result);
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
