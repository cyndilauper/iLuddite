const express = require('express');
const router = express.Router();

const app = express();

const facebook = require('../services/facebook')('1787582178167706', process.env.fbSecret);

function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Not Authenticated')
  res.redirect('/');
}

router.get('/', (req, res, next) => {
  res.sendFile('index');
})

router.get('/home', authCheck, (req, res, next) => {
  // facebook.getImage(req.user.token, (imageUrl) => {
  //   req.user.image = imageUrl;
    facebook.getFriends(req.user.token, 'me', results => {
      req.user.friends = results;
      res.json({ index: 'this is the user\'s homepage', user: req.user });
    })
  // });
})

module.exports = router;
