const express = require('express');
const router = express.Router();

const path = require('path');
const app = express();

const facebook = require('../services/facebook')('1787582178167706', process.env.fbSecret);

app.use(express.static(path.join(__dirname, '../public')));

function authCheck(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', authCheck, (req, res, next) => {
  facebook.getImage(req.user.token, (imageUrl) => {
    req.user.image = imageUrl;
    facebook.getFriends(req.user.token, (results) => {
      req.user.friends = results;
      res.json({ index: 'this is the user\'s homepage', user: req.user });
    })
  });
})

router.get('/login', (req, res, next) => {
  res.send('to view this site you must <a href="./auth/facebook">login with fb</a>')
})

module.exports = router;
