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
    if (req.query.current === 'true') {
      // if request ends in current=true, push to top of list
      User.findOneAndUpdate({ id: req.params.userid },
        {$push: {queue: {$each: [req.params.bookid], $position: 0}}})
        .then(done => {
          if (done) {
            res.send(done);
          } else {
            res.send('user and/or queue not found')
          }
      }).catch(err => {
        throw err;
      });
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
    // delete book from queue
    User.update( { id: req.params.userid },
      { $pullAll: {queue: [req.params.bookid] } } )
      .then(done => {
        if (done) {
          res.send(done);
        } else {
          res.send('user and/or queue not found')
        }
    }).catch(err => {
      throw err;
    })
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
  // DELETE from user's favorite books
    User.update( { id: req.params.userid },
      { $pullAll: {favorites: [req.params.bookid] } } )
      .then(done => {
        if (done) {
          res.send(done);
        } else {
          res.send('user and/or favorite not found')
        }
    }).catch(err => {
      throw err;
    })
  })

module.exports = router;
