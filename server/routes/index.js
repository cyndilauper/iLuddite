const express = require('express');
const router = express.Router();

const path = require('path');

const User = require('../models/users');

const facebook = require('../services/facebook')('1787582178167706', process.env.fbSecret);

function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Not Authenticated')
  res.redirect('/about');
}

router.get('/', authCheck, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/app.html'));
})

router.get('/loggedin', (req, res, next) => {
  User.findOne({
        fbid: req.user.fbid
    }).then(found => {
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
              User.findOne({fbid}, (err, obj) => {
                if (err) {
                  reject(err);
                }
                resolve( {fbid: obj.fbid,
                  image: obj.image,
                  name: obj.displayName } );
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
              found.friends = result;
              res.send(found);
            })
            .catch(e => {
              console.error(e);
            })

        })
      }
      catch(err) {
        res.send('no token - you must not be signed in')
      }
      } else {
        res.send('user not found')
      }
    }).catch(err => {
      throw err;
    })
})

router.get('/about', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/about');
});

// router.get('/home', authCheck, (req, res, next) => {
//   // facebook.getImage(req.user.token, (imageUrl) => {
//   //   req.user.image = imageUrl;
//     facebook.getFriends(req.user.token, 'me', results => {
//       req.user.friends = results;
//       res.json({ index: 'this is the user\'s homepage', user: req.user });
//     })
//   // });
// })

module.exports = router;
