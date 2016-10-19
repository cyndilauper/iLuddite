const express = require('express');
const router = express.Router();

const path = require('path');
const app = express();

const facebook = require('../services/facebook')('1787582178167706', process.env.fbSecret);

app.use(express.static(path.join(__dirname, '../public')));

function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/', (req, res, next) => {
  res.send('Welcome to iLuddite. <a href="./auth">Login with FB</a>')
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
