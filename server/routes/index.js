const express = require('express');
const router = express.Router();

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
//this should work

function authCheck(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', authCheck, (req, res, next) => {
  res.json({index: 'this should only be viewable by logged in users'});
})

router.get('/login', (req, res, next) => {
  res.send('to view this site you must <a href="./auth/facebook">login with fb</a>')
})

module.exports = router;
