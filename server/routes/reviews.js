const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const User = require('../models/users');
const request = require('request');

router.route('/:bookid')

  .get((req, res, next) => {
    Review.find({book_id: req.params.bookid}, (err, reviews) => {
      Promise.all(reviews.map(rev => {
        return User.findOne({fbid: rev.user_id})
        .then(user => {
          return {
            content: rev.content,
            rating: rev.rating,
            image: user.image
          }
        })
      })).then(reviews => res.send(reviews))
    })
  })

  .post((req, res, next) => {
    req.on('data', function(chunk){
      new Promise((res, rej) => {
        var review = JSON.parse(chunk)
        review.book_id = req.params.bookid
        review.user_id = req.user.fbid
        res(review)
      })
      .then(review => {
        new Review({
          book_id: review.book_id,
          user_id: review.user_id,
          content: review.content,
          rating: review.rating
        }).save()
        .then(review => {
          console.log("inserted to DB", review)
        })
      })
    })
    res.status(200).send()
  })

module.exports = router;
