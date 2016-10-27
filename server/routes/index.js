const express = require('express');
const router = express.Router();
const path = require('path');
const profile = require('../services/profile');

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

router.get('/books/:bookid', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/app.html'));
})

router.get('/users/:userid', (req, res, next) => {
  res.redirect('/');
})

router.get('/loggedin', (req, res, next) => {
  profile(req, req.user.fbid).then(answer => {
    res.send(answer);
  })
})

router.get('/about', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/about');
});

module.exports = router;
