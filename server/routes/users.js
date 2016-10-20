const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Book = require('../models/books');

const facebook = require('../services/facebook')('1787582178167706', process.env.fbSecret);

router.get('/:userid', (req, res, next) => {
  console.log(req.session)
  // GET user info (photo, current book, queue, stats)
  User.findOne({
        fbid: req.params.userid
    }).then(found => {
      if (found) {
        // if user is found - pass their fbid to the getFriends function
        facebook.getFriends(req.user.token, found.fbid, results => {
          // convert the found object to a JSON object
          found = found.toJSON();
          // add the friends array
          found.friends = results;
          res.send(found);
        })
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
        fbid: req.params.userid
    }).then(found => {
      if (found) {
        Book.find()
          .where('_id')
          .in(found.queue)
          .then(found => {
            res.send(found);
          })
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

      User.findOneAndUpdate({ fbid: req.params.userid },
        { $push: { queue: { $each: [req.params.bookid], $position: 0 } } } )
        .then(done => {
          if (done) {
            res.json(done);
          } else {
            res.json({error: 'user and/or queue not found'})
          }
      }).catch(err => {
        throw err;
      });

    } else {
      // else, post to bottom
      User.findOneAndUpdate({ fbid: req.params.userid },
        { $push: { queue: req.params.bookid } } )
        .then(done => {
          if (done) {
            res.json(done);
          } else {
            res.json({error: 'user and/or queue not found'})
          }
      }).catch(err => {
        throw err;
      });

      User.findOne({ fbid: req.params.userid },
        { $push: { queue: req.params.bookid } } )
        // .populate('queue')
        // .exec(function(err, post) {
        // console.log(post)
        // });
        .then(done => {
          if (done) {
            res.json(done);
          } else {
            res.json({error: 'user and/or queue not found'})
          }
      }).catch(err => {
        throw err;
      });

    }
  })
  .delete((req, res, next) => {
    // delete book from queue
    User.update( { fbid: req.params.userid },
      { $pullAll: {queue: [req.params.bookid] } } )
      .then(done => {
        if (done) {
          res.json(done);
        } else {
          res.json({error: 'user and/or queue not found'})
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
        fbid: req.params.userid
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
    User.findOneAndUpdate({ fbid: req.params.userid },
      { $push: { favorites: req.params.bookid } } )
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
    User.update( { fbid: req.params.userid },
      { $pullAll: { favorites: [req.params.bookid] } } )
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
