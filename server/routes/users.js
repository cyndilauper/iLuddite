const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Book = require('../models/books');

const facebook = require('../services/facebook');

router.get('/:userid', (req, res, next) => {
  // GET user info (photo, current book, queue, stats)
  User.findOne({
    fbid: req.params.userid
    })
    .populate('queue favorites')
    .exec((err, result) => {
      if (err) throw err;
      // else console.log('populated: ', result);
    })
    .then(found => {
      if (found) {
        // if user is found - pass their fbid to the getFriends function

        try {
        facebook.getFriends(req.user.token, found.fbid, results => {

          // convert the found object to a JSON object
          found = found.toJSON();
          // add the friends array

          // this function will get the photo from a user's profile
          function getImage(fbid) {
            return new Promise((resolve, reject) => {
              User.findOne({fbid}, (error, obj) => {
                if (error) {
                  reject(error);
                } else if (!obj) {
                  // if user is a friend that uses the app, but is not found
                  // in the database, return null
                  console.log('Error: FB friend missing from database')
                  resolve( null );
                } else {
                  resolve( {fbid: obj.fbid,
                    image: obj.image,
                    name: obj.displayName } );
                }
              });
            })
          }

          // map over the results object and add images
          let mapped = results.map(friend => {
            return getImage(friend.id)
          })

          // once all async mapping functions have resolved, add the array to
          // the found object and return it
          Promise.all(mapped)
            .then(result => {
              result = result.filter(friend => {
                // filter out any null friends
                if (friend) {
                  return friend;
                }
              })
              found.friends = result;
              res.send(found);
            })
            .catch(error => {
              console.log(error);
            })

        })
      }
      catch(error) {
        res.send(`Error: ${error} \n Maybe no token?`)
      }
      } else {
        res.send('user not found')
      }
    }).catch(error => {
      throw error;
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
        { $push: { queue: { $each: [req.params.bookid], $position: 0 } } })
        .then(user => {
          if (user) {
            Book.findOne({_id: req.params.bookid}).then(book => {
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
        { $push: { queue: req.params.bookid } } )
        .then(user => {
          if (user) {
            Book.findOne({_id: req.params.bookid})
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
      { $pullAll: {queue: [req.params.bookid] } } )
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
    }).catch(error => {
      throw error;
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

module.exports = router;
