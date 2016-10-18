const express = require('express');
const router = express.Router();
const User= require('../users');


// router.param('userid', (req, res, next, userid) => {
//   next();
// })

router.get('/:userid', (req, res, next) => {
  // GET user info (photo, friends, current book, queue, stats)
  mongoose.model('Users').findById(req.id, function(err, user) {
    if (err) {
      console.log('You have a GET Error: There was a problem getting:' + err);
    } else {
      console.log('GET retrived ID:' + user._id);
    }
  })
  res.json({'userID': req.params.userid});
  next();
})

router.get('/:userid/queue', (req, res, next) => {
  // GET user queue
  res.json({'userIDqueue': req.params.userid});
})

router.route('/:userid/queue/:bookid')
  // POST or DELETE book to queue
  .post((req, res, next) => {
    if (req.param('current') === 'true') {
      // if request ends in current=true, push to top of list
      res.json({'bookIDz': req.params.bookid});
    } else {
      // else, post to bottom
      res.json({'bookID': req.params.bookid});
    }
  })
  .delete((req, res, next) => {
    res.json({'bookID': req.params.bookid});
  })

router.route('/:userid/favorites')
  // GET, POST, or DELETE user's favorite books
  .get((req, res, next) => {
  // GET user's favorite books
  res.json({'favorites': req.params.userid});
  })
  .post((req, res, next) => {
  // POST to user's favorite books
  res.json({'favorites': req.params.userid});
  })
  .delete((req, res, next) => {
  // DELETE from user's favorite books
  res.json({'favorites': req.params.userid});
  })

module.exports = router;
