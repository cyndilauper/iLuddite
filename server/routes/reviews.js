const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews');
const request = require('request');

router.route('/:bookid')

  .get((req, res, next) => {
    Reviews.find({book_id: req.params.bookid}, (err, reviews) => {
      console.log(reviews)
      if (err) console.log(err);
      else res.send(reviews)
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
        Reviews.findOneAndUpdate({}, {
          book_id: review.book_id,
          user_id: review.user_id,
          content: review.content,
          rating: review.rating
        }, {upsert:true, new:true}, (err, review) => {
          if (err) console.log(err);
          else console.log('review inserted or updated: ', review);
         }
        )
      })
    })
    res.status(200).send()
  })

module.exports = router;
