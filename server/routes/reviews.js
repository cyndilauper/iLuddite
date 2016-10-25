const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const User = require('../models/users');
const Book = require('../models/books');
const request = require('request');

router.route('/:bookid')

  .get((req, res, next) => {
    Review.find({book_id: req.params.bookid})
    .then( reviews => {
      res.send(reviews)
    })
    .catch( err => {
      res.send(err)
    })
  })

  .post((req, res, next) => {
    console.log(req)
    var newReview = {
      book_id: req.params.bookid,
      user_id: "idk",
      content: "idk",
      rating: "idk" 
    }
    // new Review({})
    res.end(req)
  })



module.exports = router;
