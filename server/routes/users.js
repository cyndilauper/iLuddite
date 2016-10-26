const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Book = require('../models/books');
const profile = require('../services/profile');

router.get('/:userid', (req, res, next) => {
  // GET user info (photo, current book, queue, stats)
  profile(req, req.params.userid).then(answer => {
    res.send(answer);
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
    }).catch(error => {
      throw error;
    })
})

router.route('/:userid/queue/:bookid')
  // POST or DELETE book to queue
  .post((req, res, next) => {
    if (req.query.current === 'true') {
      // if request ends in current=true, push to top of list

      User.findOneAndUpdate({ fbid: req.params.userid },
        { $push: { queue: { $each: [req.params.bookid], $position: 0 } } }) //Here's what this is saying, in Mongo-talk:
        .then(user => {                                                     //Take the given bookid, and insert it into this user's queue at position 0
          if (user) {
            Book.findOne({_id: req.params.bookid}).then(book => { //Send back the book that was inserted
              res.json(book); 
            })
          } else {
            res.json({error: 'user and/or queue not found'})
          }
      }).catch(error => {
        throw error;
      });

    } else {
      // else, post to bottom
      User.findOneAndUpdate({ fbid: req.params.userid },
        { $push: { queue: req.params.bookid } } ) //In this case, you are simply pushing the book to the queue
        .then(user => {
          if (user) {
            Book.findOne({_id: req.params.bookid}) //Send back the book that was inserted
            .then(book => {
              res.json(book);
            })
          } else {
            res.json({error: 'user and/or queue not found'})
          }
      }).catch(error => {
        throw error;
      });
    }
  })
  .delete((req, res, next) => {
    // delete book from queue
    User.update( { fbid: req.params.userid },
      { $pullAll: {queue: [req.params.bookid] } } ) //Removing the bookid that was passed in from the user's queue
      .then(done => {
        if (done) {
          res.json(done);
        } else {
          res.json({error: 'user and/or queue not found'})
        }
    }).catch(error => {
      throw error;
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
        Book.find()
          .where('_id')
          .in(found.favorites)
          .then(found => {
            res.send(found);
          })
      } else {
        res.send('user and/or favorites not found')
      }
    }).catch(error => {
      throw error;
    })
  })

router.route('/:userid/favorites/:bookid')
  .post((req, res, next) => {
  // POST to user's favorite books
    User.findOneAndUpdate({ fbid: req.params.userid },
      { $push: { favorites: req.params.bookid } } )
      .then(user => {
        //send the book back, not the user
        if (user) {
          Book.findOne({_id: req.params.bookid})
          .then(book => {
            res.json(book);
          })
        } else {
          res.send('user and/or favorites not found')
        }
    }).catch(error => {
      throw error;
      console.log('error:', error);
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
    }).catch(error => {
      throw error;
    })
  })

router.route('/:userid/finished/:bookid') //Adding this to create finished books feature
// GET, POST, or DELETE user's finished books
  .get((req, res, next) => {
  // GET user's finished books
  User.findOne({
        fbid: req.params.userid
    }).then(found => {
      if (found) {
        Book.find()
          .where('_id')
          .in(found.finished)
          .then(found => {
            res.send(found);
          })
      } else {
        res.send('user and/or finished books not found')
      }
    }).catch(error => {
      throw error;
    })
  })

router.route('/:userid/finished/:bookid') //Adding this to create finished books feature
  .post((req, res, next) => {
  // POST to user's finished books
    User.findOneAndUpdate({ fbid: req.params.userid },
      { $push: { finished: req.params.bookid } } )
      .then(user => {
        //send the book back, not the user
        if (user) {
          Book.findOne({_id: req.params.bookid})
          .then(book => {
            res.json(book);
          })
        } else {
          res.send('user and/or finished books not found')
        }
    }).catch(error => {
      throw error;
      console.log('error:', error);
    });
  })
  .delete((req, res, next) => {
  // DELETE from user's finished books
    User.update( { fbid: req.params.userid },
      { $pullAll: { finished: [req.params.bookid] } } )
      .then(done => {
        if (done) {
          res.send(done);
        } else {
          res.send('user and/or finished book not found')
        }
    }).catch(error => {
      throw error;
    })
  })

//update current book count
router.post('/:userid/count', (req, res, next) => {
  User.findOneAndUpdate( { fbid: req.params.userid },
    { $inc: { stats: 1 } } )
    .then(user => {
      res.send(user);
    }).catch(error => {
      res.send(error)
    })  
})

module.exports = router;
