const mongoose = require('mongoose');
const Books = require('../models/books');
const Users = require('./models/users');


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
  res.json({
    'userID': req.params.userid
  });
  next();
})

router.get('/:userid/queue', (req, res, next) => {
  // GET user queue
  if (err) {
    console.log('You have a GET Error: There was a problem getting:' + err);
  } else {
    var shapedFiveBooks= firstFiveBooks.map(function(book){
      return{
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        thumbnail: book.volumeInfo.imageLinks.thumbnail
      }
    })
    res.send(shapedFiveBooks);
    console.log('GET retrived queue for:' + user._id);
  }
  /*res.json({
    'userIDqueue': req.params.userid*/
  });
  next();
})

router.route('/:userid/queue/:bookid')
  // POST or DELETE book to queue
  .post((req, res, next) => {
      if (req.param('current') === 'true') {
        // if request ends in current=true, push to top of list
        var queue = [{
            "schema": require('/models/book.js'),
            "query": {
              bookid: req.body.bookid
            }
          }, {
            "schema": require('/models/user.js'),
            "query": {
              username: req.body.userid
            }
          }],
          bookData = [];
        var currentBook = 0
        function recurse() {
          if (currentBook < queue.length) {
            var task = queue[currentBook];
            task.schema.findOne(task.query, function(err, data) {
              bookData.push(err || data);
              currentBook++;
              recurse();
            })
          } else {
            res.json(bookData);
          }
        }
        recurse();
        next();
      });
   /* res.json({
      'bookIDz': req.params.bookid*/
    });
  }
else {
  // else, post to bottom
  res.json({
    'bookID': req.params.bookid
  });
}
})
.delete((req, res, next) => {
  res.json({
    'bookID': req.params.bookid
  });
})

router.route('/:userid/favorites')
  // GET, POST, or DELETE user's favorite books
  .get((req, res, next) => {
    // GET user's favorite books
    Users.favorite({}, function(err, books){
      if(err){
        res.send(err);
      } else {
        res.send(user.favorites)
      }
    })
    res.json({
      'favorites': req.params.userid
    });
  })
  .post((req, res, next) => {
    // POST to user's favorite books
    res.json({
      'favorites': req.params.userid
    });
  })
  .delete((req, res, next) => {
    // DELETE from user's favorite books
    mongoose.model('Users').findById(req.id, function(err, user) {
      if (err) {
        return console.err(err);
      } else {
        user.remove(function(err, user) {
          if (err) {
            return console.error(err);
          } else {
            console.log('DELETE removed ID:' + UserBooks.isbn);
            res.format({
              html: function() {
                res.redirect('/user');
              },
              json: function() {
                res.json({
                  message: 'deleted',
                  item: book
                })
              }
            })
          }
        })
      }
    })
    res.json({
      'favorites': req.params.userid
    });
    next();
  })

module.exports = router;