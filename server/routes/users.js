const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.get('/:userid', (req, res, next) => {
  // GET user info (photo, current book, queue, stats)
  User.findOne({
        id: req.params.userid
    }).then(found => {
      if (found) {
        res.send(found);
      } else {
        res.send('user not found')
      }
    }).catch(err => {
      throw err;
    })
})

router.get('/:userid/queue', (req, res, next) => {
  // GET user queue
  User.findOne({
        id: req.params.userid
    }).then(found => {
      if (found) {
        res.send(found.queue);
      } else {
        res.send('user and/or queue not found')
      }
    }).catch(err => {
      throw err;
    })
})

router.route('/:userid/queue/:bookid')
  // POST or DELETE book to queue
  .post((req, res, next) => {
    if (req.param('current') === 'true') {
      // TODO if request ends in current=true, push to top of list
      res.json({'bookIDz': req.params.bookid});
    } else {
      // else, post to bottom
      User.findOneAndUpdate({ id: req.params.userid },
        {$push: {queue: req.params.bookid}})
        .then(done => {
          if (done) {
            res.send(done);
          } else {
            res.send('user and/or queue not found')
          }
      }).catch(err => {
        throw err;
      });
    }
  })
  .delete((req, res, next) => {
    res.json({'bookID': req.params.bookid});
  })

router.route('/:userid/favorites')
  // GET, POST, or DELETE user's favorite books
  .get((req, res, next) => {
  // GET user's favorite books
  User.findOne({
        id: req.params.userid
    }).then(found => {
      if (found) {
        res.send(found.favorites);
      } else {
        res.send('user and/or favorites not found')
      }
    }).catch(err => {
      throw err;
    })
  })
  .post((req, res, next) => {
  // POST to user's favorite books
    User.findOneAndUpdate({ id: req.params.userid },
      {$push: {favorites: req.params.bookid}})
      .then(done => {
        if (done) {
          res.send(done);
        } else {
          res.send('user and/or favorites not found')
        }
    }).catch(err => {
      throw err;
    });
  })
  .delete((req, res, next) => {
  // TODO DELETE from user's favorite books
  res.json({'favorites': req.params.userid});
  })

module.exports = router;
